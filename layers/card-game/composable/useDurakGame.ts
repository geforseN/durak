import { type Socket, io } from "socket.io-client";
import { useNotificationStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { useGameStateStore, useGameDeskStore } from "@/stores/game";
import { createSharedComposable } from "@vueuse/core";
import type { DurakGameSocket } from "@durak-game/durak-dts";
import { useGamePlayersStore } from "@/stores/game/players.store";
import { SOCKET_IO_BASE } from "@/api/socket-io";
import { useSelfDraggedCard } from "../composables/self/useSelfCardDrag";
import type { Card } from "@durak-game/durak-dts";

function makePromiseWithResolvers<T>() {
  const object = {};
  const promise = new Promise<T>((res, rej) => {
    // @ts-ignore
    object.resolve = res;
    // @ts-ignore
    object.reject = rej;
  });
  // @ts-ignore
  object.promise = promise;
  return object as {
    resolve: (value: T) => void;
    reject: (reason?: any) => void;
    promise: Promise<T>;
  };
}

function makeCardDropOnDesk(socket: Socket) {
  return function onDropOnDesk(card: Card, slotIndex: number) {
    socket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };
}

export const useSharedDurakGame = createSharedComposable(function useDurakGame({
  isDebugMode = true,
}: { isDebugMode?: boolean } = {}) {
  console.log("init useDurakGame");
  const gameSocket: Socket<
    DurakGameSocket.ServerToClientEvents,
    DurakGameSocket.ClientToServerEvents
  > = io(`${SOCKET_IO_BASE}/game/${route.params.gameId}`, {
    withCredentials: true,
    reconnectionAttempts: 3,
  });
  if (isDebugMode) {
    gameSocket.onAny((event: any, ...args: any) => {
      console.log(`%c${event}`, "color: red", ...args);
    });
  }
  const dropCardOnDesk = makeCardDropOnDesk(gameSocket);
  const selfDraggedCard = useSelfDraggedCard({
    onDropOnDesk: dropCardOnDesk,
  });

  const notificationStore = useNotificationStore();
  const playersStore = useGamePlayersStore();
  const deskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const stopMove = () => {
    gameSocket.emit("superPlayer__stopMove");
  };

  let resolveGameState: () => void;
  const gameStatePromise = new Promise<void>((resolve) => {
    resolveGameState = resolve;
  });

  function wrapWithGameState<T extends (...args: any[]) => void>(
    handler: T,
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      gameStatePromise.then(() => handler(...args));
    };
  }

  gameSocket
    .on("game::state::restore", ({ state }) => {
      gameStateStore.restore({ state, gameSocket });
      resolveGameState();
    })
    .on(
      "notification::push",
      wrapWithGameState(notificationStore.addNotificationInQueue),
    )
    .on("desk::becameClear", wrapWithGameState(deskStore.clear))
    .on("desk::receivedCard", wrapWithGameState(deskStore.insertCard))
    .on(
      "discard::receivedCards",
      wrapWithGameState((discard) => {
        if (discard.isReceivedFirstCards) {
          gameStateStore.discard.isEmpty = false;
        }
      }),
    )
    .on(
      "talon::madeDistribution",
      wrapWithGameState(({ distributionCards, talon }) => {
        if (distributionCards.isMainTrumpCardIncluded) {
          gameStateStore.talon.isEmpty = true;
        }
        if (talon.isOnlyTrumpCardRemained) {
          gameStateStore.talon.hasOneCard = true;
        }
      }),
    )
    .on(
      "player::receiveCards",
      wrapWithGameState(playersStore.putCardsToPlayer),
    )
    .on("player::changedKind", wrapWithGameState(playersStore.changePlayerKind))
    .on(
      "player::removeCard",
      wrapWithGameState(playersStore.removeCardFromPlayer),
    )
    .on(
      "allowedPlayer::defaultBehavior",
      wrapWithGameState(playersStore.updateTimerForNewAllowedPlayer),
    )
    .on(
      "round::new",
      wrapWithGameState(({ round }) => {
        gameStateStore.round.number = round.number;
      }),
    )
    .connect();

  return {
    selfDraggedCard,
    dropCardOnDesk,
    stopMove,
  };
});
