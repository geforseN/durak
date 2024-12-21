<template>
  <div
    v-if="isFocused"
    class="content-box absolute bottom-0.5 z-10 flex w-full flex-wrap content-start justify-center gap-1 border-2 border-black"
  >
    <slot />
  </div>
  <input
    type="radio"
    name="game-desk-slot"
    class="absolute inset-0 z-10 h-full w-full appearance-none rounded-md focus:outline-dashed focus:outline-4 focus:outline-offset-2 focus:outline-accent"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
</template>
<script setup lang="ts">
import { ref, type Slot } from "vue";

const isFocused = ref(false);

defineSlots<{
  default: Slot;
}>();
</script>
