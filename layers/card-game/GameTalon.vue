<template>
  <div class="relative right-5 xs:right-3 lg:right-2">
    <card-background
      v-if="
        !gameStateStore.talon.hasOneCard &&
        !gameStateStore.talon.isEmpty
      "
      class="relative left-5 z-10"
    />
    <basic-card
      v-bind="gameStateStore.talon.trumpCard"
      class="absolute top-0 rotate-90"
      :class="gameStateStore.talon.isEmpty && 'opacity-30'"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from "@/stores/game";
import BasicCard from "$/card-game/BasicCard.vue";
import CardBackground from "$/card-game/CardBackground.vue";

const gameStateStore = useGameStateStore();
</script>
