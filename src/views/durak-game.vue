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
import { onMounted, reactive, ref } from "vue";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import { BASE_SOCKET_URI as host } from "@/socket";
import type { Card, DeskSlot, GameState, PlayerRole, UIStatus } from "@/module/card-game/types";

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