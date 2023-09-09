import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type Socket, io } from "socket.io-client";
import type { Card } from "@/module/card-game/types";
import { useNotificationStore } from "@/stores/notification.store";
import {
  useGameStateStore,
  useGameDeskStore,
  useGameSelfStore,
  useGameEnemiesStore,
} from "@/stores/game";
import { useUserStore } from "@/stores/user.store";
import { createSharedComposable } from "@vueuse/core";

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
    .on("game::state::restore", ({ state, _state }) => {
      console.log({ state, _state });
      gameStateStore.restore({ state, _state });
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
    .on("discard::becameFilled", () => {
      gameStateStore.discard.isEmpty = false;
    })
    .on("discard::receivedCards", ({ addedCardsCount, totalCardsCount }) => {})
    .on(
      "talon::madeDistribution",
      ({
        distributionCards: { count, isMainTrumpCardIncluded },
        receiver: { id },
        talon: { isOnlyTrumpCardRemained, cardCount },
      }) => {},
    )
    .on("player::receiveCards", (payload) => {
      const { player } = payload;
      if (Object.hasOwn(player, "addedCardsCount")) {
        player.id;
        enemiesStore;
      } else {
        selfStore.pushCards(player.addedCards);
      }
    })
    .on("player::changedKind", (payload) => {
      const { player } = payload;
      if (Object.hasOwn(player, "id")) {
        enemiesStore;
      } else {
        selfStore;
      }
    })
    .on("player::removeCard", (payload) => {
      if (Object.hasOwn(payload, "card")) {
        selfStore.removeCard(payload.card);
      } else {
        const { player } = payload;
        const enemy = enemiesStore.findById(player.id);
        if (!enemy) {
          throw new Error(`Enemy with id=${player.id} was not found`);
        }
        if (typeof player.newCardCount !== "undefined") {
          enemy.cardCount = player.newCardCount;
        } else {
          enemy.cardCount--;
        }
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
    .connect();

  return {
    handleCardDropOnDesk,
    handleCardDrag,
    handleCardDragEnd,
    stopMove,
  };
}

export const useSharedDurakGame = createSharedComposable(useDurakGame);
