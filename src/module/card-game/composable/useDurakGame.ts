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
import { useUserStore } from "@/stores/user.store";


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
  const userStore = useUserStore();

  const stopMove = () => gameSocket.emit("superPlayer__stopMove");

  const handleCardDrag = (event: any, card: Card) => {
    draggedCard.value = event.target;
    event.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleCardDragEnd = (_event: any, _card: Card) => {
    draggedCard.value = null;
  };

  const handleCardDropOnDesk = (event: any, slotIndex: number) => {
    const card = JSON.parse(event.dataTransfer.getData("card"));
    gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  };

  const insertOnDesk = ({ card, slotIndex }: { card: Card, slotIndex: number }) => {
    gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
  }

  const changeAllowedPlayer = (accname: string, timeEnd: number, moveTime: number) => {
    if (selfStore.selfId !== accname && !enemiesStore.has({ accname })) {
      throw new Error("Can't change allowedPlayerId");
    }
    gameStateStore.gameState.allowedPlayerId = accname;
    gameStateStore.timer.pause()
    gameStateStore.endTime = timeEnd;
    gameStateStore.timer.resume()
  }

  (<{ eventName: string, listener: (...args: any) => void }[]>[
    { eventName: "game__restoreState", listener: gameStateStore.restore },
    { eventName: "notification__send", listener: notificationStore.addNotificationInQueue },
    { eventName: "player__allowedToMove", listener: changeAllowedPlayer },
    { eventName: "player__changeCardCount", listener: enemiesStore.changeEnemyCardCount },
    { eventName: "player__changeKind", listener: gameStateStore.changeRole },
    { eventName: "player__exitGame", listener: () => null },
    { eventName: "player__receiveCards", listener: selfStore.pushCard },
    { eventName: "superPlayer__removeCard", listener: selfStore.removeCard },
    { eventName: "desk__clear", listener: deskStore.clear },
    { eventName: "talon__showTrumpCard", listener: gameStateStore.setTrumpCard },
    { eventName: "desk__cardReceive", listener: deskStore.insertCard },
    {
      eventName: "desk__pushToDiscard", listener: () => {
        // TODO cool animation
      }
    },
    {
      eventName: "talon__distributeCards", listener: (_playerId: string, _cardCount: number) => {
        // TODO cool animation
      }
    },
    {
      eventName: "talon__moveTrumpCardTo", listener: (_playerId: string) => {
        // TODO cool animation
      }
    },
    {
      eventName: "defender__wonRound", listener: (_playerId: string, enddedRoundNumber: number) => {
        gameStateStore.gameState.roundNumber = enddedRoundNumber + 1;
        gameStateStore.gameState.isDefenderGaveUp = false;
      }
    },
    {
      eventName: "defender__lostRound", listener: (_playerId: string, enddedRoundNumber: number) => {
        gameStateStore.gameState.roundNumber = enddedRoundNumber + 1;
        gameStateStore.gameState.isDefenderGaveUp = false;
      }
    },
    {
      eventName: "talon__moveTrumpCardTo", listener: (_playerId) => {
        gameStateStore.gameState.isTalonHasOneCard = false;
        gameStateStore.gameState.isTalonEmpty = true;
        // TODO cool animation
      }
    },
    { eventName: "defender__gaveUp", listener: () => (gameStateStore.gameState.isDefenderGaveUp = true) },
    { eventName: "talon__keepOnlyTrumpCard", listener: () => (gameStateStore.gameState.isTalonHasOneCard = true) },
    { eventName: "discard__setIsNotEmpty", listener: () => (gameStateStore.gameState.isDiscardEmpty = false) },
    {
      eventName: "", listener: (gameId: string) => {
        userStore.currentGameId = gameId;
      }
    },
    { eventName: "", listener: () => null },
  ]).forEach(({ eventName, listener }) => gameSocket.on(eventName, listener));

  return {
    handleCardDropOnDesk,
    handleCardDrag,
    handleCardDragEnd,
    insertOnDesk,
    stopMove
  };
}