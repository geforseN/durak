<template>
  <div
    class="grid grid-flow-row grid-cols-2 justify-items-center xs:grid-cols-3"
  >
    <game-desk-slot
      v-for="(slot, index) of slots"
      v-bind="slot"
      :key="index"
      :index
    />
  </div>
</template>
<script setup lang="ts">
import type { Card } from "@durak-game/durak-dts";
import GameDeskSlot from "$/card-game/layers/desk/GameDeskSlot.vue";

defineProps<{
  slots: {
    attackCard?: Card;
    defendCard?: Card;
  }[];
}>();

defineEmits<{
  slotDrop: [slotIndex: number];
}>();
</script>
