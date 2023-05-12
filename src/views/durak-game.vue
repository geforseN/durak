<template>
  <main class="min-h-[90vh] flex flex-col justify-evenly bg-secondary dark:bg-secondary-content gap-y-2">
    <game-field :handle-card-drop-on-desk="handleCardDropOnDesk" />
    <self-data :handle-card-drag="handleCardDrag" :handle-card-drag-end="handleCardDragEnd" :stop-move="stopMove" />
  </main>
  <div class="grid absolute top-1.5 right-14 bg-primary border-black divide-black divide-y-2 border-2 ">
    <span class="bg-gray-500 w-full">{{ gameStateStore.gameState.roundNumber }} раунд</span>
    <span :class="[selfStore.isDefender && 'bg-blue-600', selfStore.isAttacker && 'bg-red-600']">
      {{ selfStore.self.role }}
    </span>
  </div>
</template>
<script setup lang="ts">
import GameField from "@/module/card-game/GameField.vue";
import SelfData from "@/module/card-game/SelfData.vue";
import { useDurakGame } from "@/module/card-game/composable/useDurakGame";
import {
  useGameStateStore,
  useGameSelfStore,
} from "@/stores/game";

const selfStore = useGameSelfStore();
const gameStateStore = useGameStateStore();
const {
  handleCardDrag,
  handleCardDragEnd,
  handleCardDropOnDesk,
  stopMove,
} = useDurakGame({ debug: true });
</script>
