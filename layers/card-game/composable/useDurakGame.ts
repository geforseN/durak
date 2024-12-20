import type { Socket } from "socket.io-client";
import { useNotificationStore } from "@/stores";
import { useGameStateStore, useGameDeskStore } from "@/stores/game";
import { createSharedComposable } from "@vueuse/core";
import { useGamePlayersStore } from "@/stores/game/players.store";
import { useSelfDraggedCard } from "../composables/self/useSelfCardDrag";
import type { Card } from "@durak-game/durak-dts";

function makeCardDropOnDesk(socket: Socket) {
  return function onDropOnDesk(card: Card, slotIndex: number) {
    socket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };
}

export function useDurakGameEvents(socket: Socket) {
  const dropCardOnDesk = makeCardDropOnDesk(socket);
  const selfDraggedCard = useSelfDraggedCard({
    onDropOnDesk: dropCardOnDesk,
  });

  const notificationStore = useNotificationStore();
  const playersStore = useGamePlayersStore();
  const deskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const stopMove = () => {
    socket.emit("superPlayer__stopMove");
  };

  socket
    .on("notification::push", notificationStore.addNotificationInQueue)
    .on("desk::becameClear", deskStore.clear)
    .on("desk::receivedCard", deskStore.insertCard)
    .on("discard::receivedCards", (discard) => {
      if (discard.isReceivedFirstCards) {
        gameStateStore.discard.isEmpty = false;
      }
    })
    .on("talon::madeDistribution", ({ distributionCards, talon }) => {
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
    });

  return {
    selfDraggedCard,
    dropCardOnDesk,
    stopMove,
  };
}

export const useSharedDurakGame = createSharedComposable(useDurakGameEvents);
