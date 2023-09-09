<template>
  <card-background v-if="!gameStateStore.gameState.discard.isEmpty" />
</template>
<script setup lang="ts">
import CardBackground from "@/module/card-game/CardBackground.vue";
import { useGameStateStore } from "@/stores/game";

const gameStateStore = useGameStateStore();
</script>
