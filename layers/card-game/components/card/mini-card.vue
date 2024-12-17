<template>
  <div
    class="flex h-[19.25px] w-[13.75px] flex-col overflow-hidden rounded border border-black bg-gray-100 font-mono text-xs/3"
  >
    <span class="relative -top-0.5 self-start">{{ rank }}</span>
    <span
      class="relative bottom-1 self-end"
      :class="(suit === '♥' || suit === '♦') && 'text-red-600'"
    >
      {{ suit }}
    </span>
  </div>
</template>
<script setup lang="ts">
import type { Card } from "game/types";

defineProps<Card>();
</script>
