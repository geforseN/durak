<template>
  <main class="min-h-[90vh] grid grid-rows-[min-content_1fr_min-content]"
        ref="refOfBoard"
  >
    <div class="bg-gray-800 flex justify-center items-center">
      <div v-for="enemy of enemiesStore.enemies" :key="enemy.info.accname">
        <enemy-profile
          :enemy="enemy"
          :isAllowedToMove="enemy.info.accname === gameStateStore.gameState.allowedPlayerId"
        />
      </div>
    </div>
    <game-desk
      :desk-slots="deskStore.deskSlots"
      @drop-card-on-desk="handleCardDropOnDesk"
    />
    <template v-if="gameStateStore.gameState.trumpCard">
      <game-card
        class="absolute bottom-1/2 right-1/2 translate-x-[275px] "
        :rank="gameStateStore.gameState.trumpCard.rank"
        :suit="gameStateStore.gameState.trumpCard.suit"
      />
    </template>
    <section class="flex flex-col">
      <super-user-interface @stop-move="stopMove" />
      <self-deck
        @card-drag="handleCardDrag"
        @card-drag-end="handleCardDragEnd"
        :is-allowed-to-move="selfStore.self.info.accname === gameStateStore.gameState.allowedPlayerId"
      />
    </section>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useNotificationStore } from "@/stores/notification.store";
import type { Card, DeskSlot } from "@/module/card-game/types";
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import GameCard from "@/module/card-game/Card.vue";
import GameDesk from "@/module/card-game/Desk.vue";
import EnemyProfile from "@/module/card-game/EnemyProfile.vue";
import SuperUserInterface from "@/module/card-game/SuperUserInteface.vue";
import {
  useGameStateStore,
  useGameDeskStore,
  useGameSelfStore,
  useGameEnemiesStore,
} from "@/stores/game";
import { ref } from "vue";
import { io } from "socket.io-client";

const refOfBoard = ref<HTMLElement>();
const draggedCard = ref<HTMLElement | null>(null);

const route = useRoute();
const gameSocket = io(
  `${import.meta.env.VITE_SOCKET_SERVER_ADDRESS}/game/${route.params.gameId}`,
  { withCredentials: true },
);
gameSocket.onAny((event: any, ...args: any) => {
  console.log(`got event ${event}`);
  console.log(...args);
});

const notificationStore = useNotificationStore();
const enemiesStore = useGameEnemiesStore();
const selfStore = useGameSelfStore();
const deskStore = useGameDeskStore();
const gameStateStore = useGameStateStore();

const handleCardDropOnDesk = (event: any, slot: DeskSlot, slotIndex: number) => {
  const card = JSON.parse(event.dataTransfer.getData("card"));
  gameSocket.emit("superPlayer__putCardOnDesk", card, slotIndex);
};

const handleCardDrag = (event: any, card: Card) => {
  console.log(event.target);
  // console.log(event.currentTarget);
  draggedCard.value = event.target;
  console.log(card);
  event.dataTransfer.setData("card", JSON.stringify(card));
  console.log("__ASD__");
};

const handleCardDragEnd = (event: any, card: Card) => {
  draggedCard.value = null;
  console.log("__asd__");
};

const stopMove = () => gameSocket.emit("superPlayer__stopMove");

;[
  { eventName: "state__restore", listener: gameStateStore.restore },
  { eventName: "notification__send", listener: notificationStore.addNotificationInQueue },
  { eventName: "player__changeRole", listener: gameStateStore.changeRole },
  // { eventName: "attackUI__setStatus", callback: UIStore.setAttackUI },
  // { eventName: "defendUI__setStatus", callback: UIStore.setDefendUI },
  { eventName: "self__removeCard", listener: selfStore.removeCard },
  { eventName: "player__receiveCards", listener: selfStore.pushCard },
  { eventName: "enemy__changeCardCount", listener: enemiesStore.changeEnemyCardCount },
  { eventName: "desk__clear", listener: deskStore.clear },
  { eventName: "player__insertCard", listener: deskStore.insertCard },
].forEach(({ eventName, listener }) => gameSocket.on(eventName, listener));

gameSocket.on("talon__showTrumpCard", gameStateStore.setTrumpCard); // TODO
gameSocket.on("player__allowedToMove", (accname: string) => {
  if (selfStore.selfId !== accname && !enemiesStore.has({ accname })) {
    throw new Error("Can't change allowedPlayerId");
  }
  gameStateStore.gameState.allowedPlayerId = accname;
});
gameSocket.on("desk__pushToDiscard", () => {
});
gameSocket.on("talon__distributeCards", (accname: string, cardCount: number) => {
  // console.log(refOfBoard.value?.getBoundingClientRect());
  // if (draggedCard.value) {
  //   console.warn(draggedCard.value);
  // }
});
gameSocket.on("talon__moveTrumpCardTo", (accname: string) => {
});
gameSocket.on("defender__lostRound", (accname: string, roundNumber: number) => {
});
gameSocket.on("defender__wonRound", (accname: string, roundNumber: number) => {
});

</script>