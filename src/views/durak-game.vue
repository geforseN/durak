<template>
  <main
    class="min-h-[90vh] flex flex-col justify-evenly items-center
  bg-emerald-400 xxs:bg-neutral-500 xs:bg-indigo-600 sm:bg-yellow-500 md:bg-green-500 lg:bg-red-500 xl:bg-purple-500 2xl:bg-amber-500">
    <div class="w-full h-full bg-red-900 flex justify-around">
      <enemy-profile class="flex-1" v-for="enemy of enemiesStore.topEnemies" :key="enemy.id" :enemy="enemy"
        :isAllowedToMove="enemy.id === gameStateStore.allowedPlayerId" />
      </div>
    <div class="w-full flex justify-around">
      <div>
        <side-enemy-profile v-for="enemy of enemiesStore.leftEnemies" :key="enemy.id" 
          :enemy="enemy" :isAllowedToMove="enemy.id === gameStateStore.allowedPlayerId" />
    </div>
      <div class="bg-secondary">
        <game-desk :desk-slots="deskStore.deskSlots" @drop-card-on-desk="handleCardDropOnDesk" />
    <template v-if="gameStateStore.gameState.trumpCard">
          <p> Trump Card: {{ gameStateStore.gameState.trumpCard?.rank + gameStateStore.gameState.trumpCard?.suit }}</p>
    </template>
      </div>
      <div>
        <side-enemy-profile v-for="enemy of enemiesStore.rightEnemies" :key="enemy.id" 
        :enemy="enemy" :isAllowedToMove="enemy.id === gameStateStore.allowedPlayerId"/>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div v-if="selfStore.self.id === gameStateStore.allowedPlayerId" class="mb-4 text-xl">
        <span class="flex gap-x-2 justify-center items-center">
          <emoji-happy /> Время твоего хода <emoji-happy />
        </span>
        <span>У тебя есть XX секунд на ход</span>
      </div>
      <super-user-interface @stop-move="stopMove" />
      <self-deck @card-drag="handleCardDrag" @card-drag-end="handleCardDragEnd" />
    </div>
  </main>
  <div class="flex justify-center items-center gap-x-2">
    <span>{{ gameStateStore.gameState.roundNumber }} раунд </span>
    <span>{{ selfStore.self.role }}</span>
    <span>{{ selfStore.self.info.nickname }} </span>
    <img class="w-6 h-6" :src="selfStore.self.info.photoUrl" alt="Your profile picture">
  </div>
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