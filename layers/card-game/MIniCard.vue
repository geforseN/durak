<template>
  <div
    class="flex flex-col w-[13.75px] h-[19.25px] bg-gray-100 rounded border border-black text-xs/3 font-mono overflow-hidden"
  >
    <span class="self-start relative -top-0.5">{{ props.rank }}</span>
    <span
      class="self-end relative bottom-1"
      :class="(props.suit === '♥' || props.suit === '♦') && 'text-red-600'"
    >{{ props.suit }}</span>
  </div>
</template>
<script setup lang="ts">
import type { Card } from "./types";
const props = defineProps<Card>();
</script>
