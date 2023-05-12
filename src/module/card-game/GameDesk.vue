<template>
  <div class="max-w-5xl grid grid-cols-2 xs:grid-cols-3 grid-flow-row bg-primary justify-items-center">
    <template v-for="(slot, index) of props.deskSlots" :key="index">
      <game-desk-slot v-bind="{ ...slot, index }" @dragenter.prevent @dragover.prevent
        @drop="emit('dropCardOnDesk', $event, slot, index)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DeskSlot } from "@/module/card-game/types";
import GameDeskSlot from "@/module/card-game/GameDeskSlot.vue";

const props = defineProps<{
  deskSlots: DeskSlot[]
}>();

const emit = defineEmits<{
  (e: "dropCardOnDesk", event: Event, slot: DeskSlot, index: number): void
}>();
</script>
