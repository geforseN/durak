<template>
  <div class="flex w-full max-w-5xl flex-col">
    <slot name="top" />
    <slot name="deck" />
  </div>
</template>
<script setup lang="ts">
import type { Slot } from "vue";

defineSlots<{
  top: Slot;
  deck: Slot;
}>();
</script>
