<template>
  <div
    class="w-full h-full flex justify-around items-center self-center bg-neutral rounded max-lg:rounded-t-none max-w-5xl p-2 border-2 border-neutral-900">
    <component v-for="(enemy, index) of enemiesStore.topEnemies" :enemy="enemy"
               :is="index % 2 ? EnemyProfile.TopRight : EnemyProfile.TopLeft"
               :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
  </div>
  <div class="w-full flex justify-evenly gap-x-0 xxs:gap-x-2 xs:gap-x-4 xs:px-2">
    <div class="flex flex-col justify-evenly gap-y-4">
      <EnemyProfile.Left v-for="enemy of enemiesStore.leftEnemies" :key="enemy.id" :enemy="enemy"
                         :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
    </div>
    <game-board :handle-card-drop-on-desk="props.handleCardDropOnDesk" :cardDeskInsert="cardDeskInsert" />
    <div class="flex flex-col justify-evenly gap-y-4">
      <EnemyProfile.Right v-for="enemy of enemiesStore.rightEnemies" :key="enemy.id" :enemy="enemy"
                          :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameEnemiesStore, useGameStateStore } from "@/stores/game";
import * as EnemyProfile from "@/module/card-game/enemy-profile";
import GameBoard from "@/module/card-game/GameBoard.vue";

const enemiesStore = useGameEnemiesStore();
const gameStateStore = useGameStateStore();

const props = defineProps<{
  handleCardDropOnDesk: Function;
  cardDeskInsert: Function;
}>();
</script>