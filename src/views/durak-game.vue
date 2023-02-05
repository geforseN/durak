<template>
  <div v-if="isLoaded">
    <div class="flex-grow flex justify-center items-center bg-gray-800">
      <!--    -->
      <div v-for="enemy of gameState.enemies">
        <div class="bg-gray-400-500 w-24 h-24">
          <div class="flex">
            <img class="w-16 h-16 border-4 border-black" :src="enemy.info.photoUrl"
                 :alt="`${enemy.info.nickname} profile picture`">
            <a :href="enemy.info.personalLink">
              <span class="font-bold text-xl">{{ enemy.info.nickname }}</span>
              <span class="text-xs">{{ enemy.info.accname }}</span>
            </a>
          </div>
          <div class="flex">
            <div v-for="cardNumber of enemy.cardCount" class="h-[116px] w-[83px] bg-indigo-600 border">
              {{ cardNumber }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="shouldShowAttackUI"
         class="absolute z-20 bottom-6 left-2 border-2 border-black flex flex-col items-center gap-y-1 font-bold">
      <button class="w-full bg-red-600 p-1" @click="gameSocket.emit('attack__stopAttack')">Закончить атаку</button>
      <p>Атака</p>
      <button class="w-full bg-indigo-600 p-1">Кинуть карту</button>
    </div>
    <div v-if="shouldShowDefendUI"
         class="absolute z-20 bottom-6 right-2 border-2 border-black flex flex-col items-center gap-y-1 font-bold">
      <button class="w-full bg-red-600 p-1" @click="gameSocket.emit('defend__takeCards')">Забрать карты</button>
      <p>Защита</p>
      <button class="w-full bg-indigo-600 p-1">Отбить карту</button>
    </div>
    <div class="m-auto grid grid-cols-3 grid-flow-row w-max">
      <div v-for="(slot, index) of gameState.desk"
           class="relative bg-orange-400 font-bold border text-3xl h-[160px] w-[114px] flex"
           @drop="handleCardDropOnDesk($event, slot)"
           @dragenter.prevent
           @dragover.prevent
      >
        <div v-if="slot.attackCard === null && slot.defendCard === null"
             class="bg-indigo-400 absolute inset-0 h-[116px] w-[83px] flex justify-center items-center ">
          {{ index }}
        </div>
        <div v-if="slot.attackCard" :style="cardStyle(slot.attackCard)" class="h-[116px] w-[83px]" />
        <div v-if="slot.defendCard" :style="cardStyle(slot.defendCard)"
             class="h-[116px] w-[83px] translate-x-4 translate-y-4 absolute inset-0" />
      </div>
    </div>
    <div class="flex">
      <img class="w-16 h-16 border-4 border-black" :src="gameState.self.info.photoUrl"
           :alt="`${gameState.self.info.nickname} profile picture`">
      <a :href="gameState.self.info.personalLink">
        <span class="font-bold text-xl">{{ gameState.self.info.nickname }}</span>
        <span class="text-xs">{{ gameState.self.info.accname }}</span>
      </a>
    </div>
    <div class="min-h-[100px] w-full absolute bottom-6 flex justify-center">
      <template v-if="gameState.self.cards.length > 0">
        <div v-for="card of gameState.self.cards"
             :style="cardStyle(card)"
             draggable="true"
             @dragstart="handleCardDrag($event, card)"
             class="border-2 rounded-md border-black h-[116px] w-[83px] flex block hover:scale-125 transition ease-out"
        >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { io } from "socket.io-client";
import { onMounted, reactive, ref } from "vue";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import { BASE_SOCKET_URI as host } from "@/socket";

const gameState = reactive({
  self: { info: { accname: "", photoUrl: "", connectStatus: 0, personalLink: "", nickname: "" }, cards: [] },
  enemies: [],
  desk: [],
});
const shouldShowAttackUI = ref(false);
const shouldShowDefendUI = ref(false);
const isLoaded = ref(false);

const updateAttackUI = (bool: boolean) => shouldShowAttackUI.value = bool;
const updateDefendUI = (bool: boolean) => shouldShowDefendUI.value = bool;

const route = useRoute();
const gameSocket = io(`${host}/game/${route.params.gameId}`, { withCredentials: true });

onMounted(() => gameSocket.emit("state__restore"));

gameSocket.on("attackUI__shouldShow", updateAttackUI);
gameSocket.on("defendUI__shouldShow", updateDefendUI);

gameSocket.on("state__restore", (state) => {
  console.log(state);
  gameState.self = state.self;
  gameState.enemies = state.enemies;
  gameState.desk = state.desk;
  isLoaded.value = true;
});

const putOnTable = () => {
  gameSocket.emit("desk__putCard" /* card, slotIndex */);
};

const cardStyle = (card) => {
  return {
    backgroundImage: `url(https://deckofcardsapi.com/static/img/${card.rank.at(-1)}${suitsDictionary[card.suit]}.png)`,
    backgroundSize: "cover",
    backgroundColor: "black",
  };
};

const handleCardDrag = (event, card) => {
  console.log("dragstart");
  console.log(card);
  event.dataTransfer.setData("card", JSON.stringify(card));
};

const handleCardDropOnDesk = (event, slot) => {
  console.log("drop");
  const card = JSON.parse(event.dataTransfer.getData("card"));
  if (slot.attackCard === null) slot.attackCard = card;
  else if (slot.defendCard === null) slot.defendCard = card;
  console.log(gameState.desk, card, slot);
};

</script>