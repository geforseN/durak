<template>
  <div
    class="relative"
  >
    <slot :is-focused />
    <input
      type="radio"
      name="self-card"
      class="absolute inset-0 z-10 h-full w-full pointer-events-none appearance-none rounded-md outline-none"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
  </div>
</template>
<script setup lang="ts">
import { ref, type Slot } from 'vue';

const isFocused = ref(false);

defineSlots<{
  default: Slot<{ isFocused: boolean }>
}>()
</script>