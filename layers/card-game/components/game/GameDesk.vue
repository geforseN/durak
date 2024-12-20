<template>
  <div
    class="grid grid-flow-row grid-cols-2 justify-items-center bg-primary xs:grid-cols-3"
  >
    <template
      v-for="slot of slots_"
      :key="slot.index"
    >
      <game-desk-slot
        v-bind="slot"
        @dragenter.prevent
        @dragover.prevent
        @drop="$emit('slotDrop', slot.index)"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { Card } from "@durak-game/durak-dts";
import GameDeskSlot from "$/card-game/components/game/GameDeskSlot.vue";

const props = defineProps<{
  slots: {
    attackCard?: Card;
    defendCard?: Card;
  }[];
}>();

defineEmits<{
  slotDrop: [slotIndex: number]
}>()

const slots_ = computed(() =>
  props.slots.map((slot, index) => ({ ...slot, index })),
);
</script>
