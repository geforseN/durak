<template>
  <div class="relative right-5 xs:right-3 lg:right-2">
    <card-background
      v-if="
        !gameStateStore.talon.hasOneCard &&
          !gameStateStore.talon.isEmpty
      "
      class="relative left-5 z-10"
    />
    <game-card
      v-bind="gameStateStore.talon.trumpCard"
      class="absolute top-0 rotate-90"
      :class="gameStateStore.talon.isEmpty && 'opacity-30'"
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from "@/stores/game";
import GameCard from "$/card-game/components/card/game-card.vue";
import CardBackground from "$/card-game/components/card/CardBackground.vue";

const gameStateStore = useGameStateStore();
</script>
