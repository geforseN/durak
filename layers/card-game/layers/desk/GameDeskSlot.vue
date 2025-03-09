<template>
  <div
    class="relative grid h-[83px] w-[60px] place-items-center rounded text-3xl font-bold xxs:h-[116px] xxs:w-[83px] sm:border-2 md:h-[132px] md:w-[96px] lg:h-[158px] lg:w-[115px]"
  >
    <span class="grid h-full w-full place-items-center">
      <span class="select-none opacity-50">{{ number }}</span>
    </span>
    <game-card
      v-if="attackCard"
      v-bind="attackCard"
      class="absolute"
    />
    <game-card
      v-if="defendCard"
      v-bind="defendCard"
      class="absolute z-10 translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5"
    />
  </div>
</template>
<script setup lang="ts">
import GameCard from "$/card-game/layers/card/game-card.vue";
import type { DeskSlot } from "@durak-game/durak-dts";

defineProps<
  DeskSlot & {
    index: number;
    number: number;
  }
>();
</script>
