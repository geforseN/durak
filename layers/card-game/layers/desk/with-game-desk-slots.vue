<template>
  <div
    class="grid grid-flow-row grid-cols-2 justify-items-center xs:grid-cols-3"
  >
    <slot
      v-for="(slot, index) of values"
      v-bind="slot"
      :key="index"
      :index
    />
  </div>
</template>
<script setup lang="ts">
import type { DeskSlot } from "@durak-game/durak-dts";
import type { Slot } from "vue";

defineProps<{
  values: DeskSlot[];
}>();

defineSlots<{
  default: Slot<DeskSlot & { index: number }>;
}>()
</script>
