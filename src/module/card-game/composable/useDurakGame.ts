import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type Socket, io } from "socket.io-client";
import { useNotificationStore } from "@/stores/notification.store";
import {
  useGameStateStore,
  useGameDeskStore,
  useGameSelfStore,
  useGameEnemiesStore,
} from "@/stores/game";
import { useUserStore } from "@/stores/user.store";
import { createSharedComposable } from "@vueuse/core";
import type { DurakGameSocket } from "@durak-game/durak-dts";
import {
  array,
  enumType,
  is,
  number,
  object,
  optional,
  parse,
  string,
} from "valibot";
import type { Card } from "@durak-game/durak-dts";
import { playerKinds } from "@durak-game/durak-dts";

const schemas = {
  "player::receiveCards": [
    object({
      id: string(),
      addedCardsCount: number(),
      handCount: optional(number()),
    }),
    object({
      addedCards: array(object({ rank: string(), suit: string() })),
      handCount: optional(number()),
    }),
  ],
  "player::removeCard": [
    object({
      player: object({ id: string() }),
      newCardsCount: optional(number()),
    }),
    object({
      player: optional(object({ newCardsCount: number() })),
      card: object({ rank: string(), suit: string() }),
    }),
  ],
  "allowedPlayer::defaultBehavior": object({
    allowedPlayer: optional(object({ id: string() })),
    defaultBehavior: object({
      callTime: object({ UTC: number() }),
    }),
  }),
  "player::changedKind": [
    object({
      player: object({
        id: string(),
        newKind: enumType(playerKinds),
      }),
    }),
    object({
      player: object({
        newKind: enumType(playerKinds),
      }),
    }),
  ],
} as const;

export function useDurakGame({ debug = false }: { debug?: boolean } = {}) {
  console.log("init useDurakGame");
  const draggedCard = ref<HTMLElement | null>(null);
  const route = useRoute();
  const router = useRouter();
  const { VITE_FASTIFY_SERVER_URI: host } = import.meta.env;
  if (typeof host !== "string") throw new Error();
  const gameSocket: Socket<
    DurakGameSocket.ServerToClientEvents,
    DurakGameSocket.ClientToServerEvents
  > = io(`${host.replace(":3000", ":3001")}/game/${route.params.gameId}`, {
    withCredentials: true,
    reconnectionAttempts: 3,
  });
  if (debug) {
    gameSocket.onAny((event: any, ...args: any) => {
      console.log(`%c${event}`, "color: red", ...args);
    });
  }
  console.log("WELCOME TO THE GAME");

  const notificationStore = useNotificationStore();
  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();
  const userStore = useUserStore();

  const stopMove = () => {
    gameSocket.emit("superPlayer__stopMove");
  };

  const handleCardDrag = (event: Event, card: Card) => {
    if (!event.target) throw new Error("");
    draggedCard.value = event.target;
    event.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleCardDragEnd = (_event: any, _card: Card) => {
    draggedCard.value = null;
  };

  const handleCardDropOnDesk = (card: Card, slotIndex: number) => {
    gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };

  // NOTE: DELETED events
  // 1) defender__gaveUp
  // 2) game__currentId
  // also rename of all events
  gameSocket
    .on("game::state::restore", ({ state }) => {
      console.log({ state });
      gameStateStore.restore({ state });
    })
    .on("nonStartedGame::playerJoined", () => {})
    .on("nonStartedGame::details", () => {})
    .on("finishedGame::notFound", () => {
      // TODO - redirect to separate 404 page
      router.push({ path: "/game/stat" });
    })
    .on("finishedGame::restore", (payload) => {
      // TODO - redirect to separate state, props of that page is received state from event listener
      router
        .push({
          path: "/game/stat:gameId",
          params: { gameId: payload.state.uuid },
        })
        .then(() => {})
        .catch(() => {});
    })
    .on("notification::push", notificationStore.addNotificationInQueue)
    .on("desk::becameClear", deskStore.clear)
    .on("desk::receivedCard", deskStore.insertCard)
    .on("discard::receivedCards", (discard) => {
      if (discard.isReceivedFirstCards) {
        gameStateStore.discard.isEmpty = false;
      }
    })
    .on(
      "talon::madeDistribution",
      ({
        distributionCards: { count, isMainTrumpCardIncluded },
        receiver: { id },
        talon: { isOnlyTrumpCardRemained, cardCount },
      }) => {},
    )
    .on("player::receiveCards", ({ player }) => {
      const [enemy, self] = schemas["player::receiveCards"];
      if (is(enemy, player)) {
        return enemiesStore.enemies
          .getById(player.id)
          .increaseCardCount(player.addedCardsCount);
      }
      if (is(self, player)) {
        return selfStore.self.receive(...player.addedCards);
      }
      throw new Error(`player::receiveCards incorrect payload:${player}`);
    })
    .on("player::changedKind", (payload) => {
      const [enemy, self] = schemas["player::changedKind"];
      if (is(enemy, payload)) {
        return enemiesStore.enemies
          .getById(payload.player.id)
          .setKind(payload.player.newKind);
      }
      if (is(self, payload)) {
        return selfStore.self.setKind(payload.player.newKind);
      }
    })
    .on("player::removeCard", (payload) => {
      const [enemy, self] = schemas["player::removeCard"];
      if (is(self, payload)) {
        return selfStore.self.remove(payload.card);
      }
      if (is(enemy, payload)) {
        return enemiesStore.enemies
          .getById(payload.player.id)
          .decrementCardCount();
      }
    })
    .on(
      "round::becameEnded",
      ({
        round: {
          defender: { id, isSuccessfullyDefended },
          number,
        },
      }) => {},
    )
    .on("round::new", ({ roundNumber }) => {})
    .on(
      "move::new",
      ({
        move: {
          allowedPlayer: { id },
          endTime: { UTC },
          name,
          timeToMove,
        },
      }) => {},
    )
    .on("game::over", ({ durak: { id } }) => {})
    .on("allowedPlayer::defaultBehavior", (payload) => {
      const schema = schemas["allowedPlayer::defaultBehavior"];
      const output = parse(schema, payload);
      if (typeof output.allowedPlayer !== "undefined") {
        output.allowedPlayer;
        const self = selfStore.self;
      } else {
      }
    })
    .connect();

  return {
    handleCardDropOnDesk,
    handleCardDrag,
    handleCardDragEnd,
    stopMove,
  };
}

export const useSharedDurakGame = createSharedComposable(useDurakGame);
