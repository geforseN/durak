<template>
  <div class="relative">
    <card-background v-if="!gameStateStore.gameState.isTalonHasOneCard && !gameStateStore.gameState.isTalonEmpty"
      class="relative z-10" />
    <basic-card v-if="gameStateStore.gameState.trumpCard" v-bind="gameStateStore.gameState.trumpCard"
      class="absolute top-0 right-6 rotate-90" :class="gameStateStore.gameState.isTalonEmpty && 'opacity-50'" />
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/game';
import BasicCard from '@/module/card-game/BasicCard.vue';
import CardBackground from '@/module/card-game/CardBackground.vue';

const gameStateStore = useGameStateStore();
</script>