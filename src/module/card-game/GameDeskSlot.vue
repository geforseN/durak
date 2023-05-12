<template>
  <button class="relative grid place-items-center font-bold text-3xl border sm:border-2 border-primary rounded 
    h-[83px] w-[60px] xxs:h-[116px] xxs:w-[83px] md:h-[132px] md:w-[96px] lg:h-[158px] lg:w-[115px]">
    <span class="w-full h-full bg-secondary-focus grid place-items-center">
      <span class="opacity-50">{{ props.index }}</span>
    </span>
    <basic-card v-if="props.attackCard" v-bind="props.attackCard" class="absolute" />
    <basic-card v-if="props.defendCard" v-bind="props.defendCard"
                class="absolute translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5 z-10" />
  </button>
</template>

<script setup lang="ts">
import BasicCard from "@/module/card-game/BasicCard.vue";
import type { Card } from "./types";

const props = defineProps<{
  attackCard?: Card,
  defendCard?: Card,
  index: number,
}>();
</script>