<template>
  <div class="relative right-5 xs:right-3 lg:right-2">
    <card-background
      v-if="!hasOneCard && !isEmpty"
      class="relative left-5 z-[1]"
    />
    <game-card
      v-bind="trumpCard"
      class="absolute top-0 rotate-[270deg]"
      :class="isEmpty && 'opacity-30'"
    />
  </div>
</template>
<script setup lang="ts">
import GameCard from "$/card-game/layers/card/game-card.vue";
import CardBackground from "$/card-game/layers/card/CardBackground.vue";
import type { Card } from "@durak-game/durak-dts";

defineProps<{
  isEmpty: boolean;
  hasOneCard: boolean;
  trumpCard: Card;
}>()
</script>
