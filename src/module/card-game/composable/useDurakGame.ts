import { ref } from "vue";
import { type Socket, io } from "socket.io-client";
import { useNotificationStore } from "@/stores/notification.store";
import { useRoute, useRouter } from "vue-router";
import { useGameStateStore, useGameDeskStore } from "@/stores/game";
import { createSharedComposable } from "@vueuse/core";
import type { DurakGameSocket } from "@durak-game/durak-dts";
import type { Card as CardDTO } from "@durak-game/durak-dts";
import { useGamePlayersStore } from "@/stores/game/players.store";

export const useSharedDurakGame = createSharedComposable(function useDurakGame({
  isDebugMode = true,
}: { isDebugMode?: boolean } = {}) {
  console.log("init useDurakGame");
  const draggedCard = ref<CardDTO | null>(null);
  const route = useRoute();
  const router = useRouter();
  const { VITE_FASTIFY_SERVER_URI: host } = import.meta.env;
  if (typeof host !== "string") {
    throw new Error();
  }
  const gameSocket: Socket<
    DurakGameSocket.ServerToClientEvents,
    DurakGameSocket.ClientToServerEvents
  > = io(`${host.replace(":3000", ":3001")}/game/${route.params.gameId}`, {
    withCredentials: true,
    reconnectionAttempts: 3,
  });
  if (isDebugMode) {
    gameSocket.onAny((event: any, ...args: any) => {
      console.log(`%c${event}`, "color: red", ...args);
    });
  }
  const notificationStore = useNotificationStore();
  const playersStore = useGamePlayersStore();
  const deskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const stopMove = () => {
    gameSocket.emit("superPlayer__stopMove");
  };

  const handleCardDrag = (_event: DragEvent, card: CardDTO) => {
    draggedCard.value = card;
  };

  const handleCardDragEnd = (_event: DragEvent, _card: CardDTO) => {
    draggedCard.value = null;
  };

  const handleCardDropOnDesk = (card: CardDTO, slotIndex: number) => {
    gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };

  const handleDraggedCardDropOnDesk = (slotIndex: number) => {
    if (!draggedCard.value) {
      return;
    }
    handleCardDropOnDesk(draggedCard.value, slotIndex);
  };

  // NOTE: DELETED events
  // 1) defender__gaveUp
  // 2) game__currentId
  // also rename of all events
  gameSocket
    .on("game::state::restore", ({ state }) => {
      gameStateStore.restore({ state, gameSocket });
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
    .on("talon::madeDistribution", ({ distributionCards, receiver, talon }) => {
      if (distributionCards.isMainTrumpCardIncluded) {
        gameStateStore.talon.isEmpty = true;
      }
      if (talon.isOnlyTrumpCardRemained) {
        gameStateStore.talon.hasOneCard = true;
      }
    })
    .on("player::receiveCards", playersStore.putCardsToPlayer)
    .on("player::changedKind", playersStore.changePlayerKind)
    .on("player::removeCard", playersStore.removeCardFromPlayer)
    .on(
      "allowedPlayer::defaultBehavior",
      playersStore.updateTimerForNewAllowedPlayer,
    )
    .on("round::new", ({ round }) => {
      gameStateStore.round.number = round.number;
    })
    .on("move::new", ({ move: { name, performer, insert } }) => {})
    .on("game::over", ({ durak: { id } }) => {})
    .connect();

  return {
    handleCardDropOnDesk,
    handleDraggedCardDropOnDesk,
    handleCardDrag,
    handleCardDragEnd,
    stopMove,
  };
});
