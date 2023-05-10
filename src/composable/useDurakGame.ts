import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import type { Card, DeskSlot } from "@/module/card-game/types";

import { useNotificationStore } from "@/stores/notification.store";
import {
  useGameStateStore,
  useGameDeskStore,
  useGameSelfStore,
  useGameEnemiesStore,
} from "@/stores/game";


export function useDurakGame({ debug = false }: { debug?: boolean } = {}) {
  const draggedCard = ref<HTMLElement | null>(null);
  const { params: { gameId } } = useRoute();
  const { VITE_SOCKET_SERVER_ADDRESS: host } = import.meta.env;

  const gameSocket = io(`${host}/game/${gameId}`, { withCredentials: true });
  if (debug) {
    gameSocket.onAny((event: any, ...args: any) => {
      console.log(`%c${event}`, 'color: red', ...args);
    });
  }

  const notificationStore = useNotificationStore();
  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const stopMove = () => gameSocket.emit("superPlayer__stopMove");

  const handleCardDrag = (event: any, card: Card) => {
    draggedCard.value = event.target;
    event.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleCardDragEnd = (event: any, card: Card) => {
    draggedCard.value = null;
  };

  const handleCardDropOnDesk = (event: any, slot: DeskSlot, slotIndex: number) => {
    const card = JSON.parse(event.dataTransfer.getData("card"));
    gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };

  const changeAllowedPlayer = (accname: string) => {
    if (selfStore.selfId !== accname && !enemiesStore.has({ accname })) {
      throw new Error("Can't change allowedPlayerId");
    }
    gameStateStore.gameState.allowedPlayerId = accname;
  }

  (<{ eventName: string, listener: (...args: any) => void }[]>[
    { eventName: "state__restore", listener: gameStateStore.restore },
    { eventName: "notification__send", listener: notificationStore.addNotificationInQueue },
    { eventName: "player__changeRole", listener: gameStateStore.changeRole },
    { eventName: "self__removeCard", listener: selfStore.removeCard },
    { eventName: "player__receiveCards", listener: selfStore.pushCard },
    { eventName: "enemy__changeCardCount", listener: enemiesStore.changeEnemyCardCount },
    { eventName: "desk__clear", listener: deskStore.clear },
    { eventName: "talon__showTrumpCard", listener: gameStateStore.setTrumpCard },
    { eventName: "player__insertCard", listener: deskStore.insertCard },
    { eventName: "player__allowedToMove", listener: changeAllowedPlayer },
    { eventName: "desk__pushToDiscard", listener: () => null },
    { eventName: "talon__distributeCards", listener: (accname: string, cardCount: number) => null },
    { eventName: "talon__moveTrumpCardTo", listener: (accname: string) => null },
    { eventName: "defender__wonRound", listener: (accname: string, roundNumber: number) => null },
    { eventName: "defender__lostRound", listener: (accname: string, roundNumber: number) => null },
    { eventName: "", listener: () => null },
  ]).forEach(({ eventName, listener }) => gameSocket.on(eventName, listener));

  return {
    handleCardDropOnDesk,
    handleCardDrag,
    handleCardDragEnd,
    stopMove
  };
}