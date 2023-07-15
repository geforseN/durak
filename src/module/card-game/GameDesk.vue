<template>
  <div class="grid grid-cols-2 xs:grid-cols-3 grid-flow-row bg-primary justify-items-center">
    <template v-for="(slot, index) of props.deskSlots" :key="index">
      <game-desk-slot v-bind="{ ...slot, index }" @dragenter.prevent @dragover.prevent
        @drop="emit('dropCardOnDesk', $event, index)"
        @insertCard="(data) => emit('insertCard', data)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Card, DeskSlot } from "@/module/card-game/types";
import GameDeskSlot from "@/module/card-game/GameDeskSlot.vue";

const props = defineProps<{
  deskSlots: DeskSlot[]
}>();

const emit = defineEmits<{
  (e: "dropCardOnDesk", event: Event, index: number): void
  (e: "insertCard", data: { card: Card, slotIndex: number }): void
}>();
</script>
