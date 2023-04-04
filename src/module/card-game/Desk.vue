<template>
  <div class="m-auto items-center justify-items-center w-max grid grid-cols-3 grid-flow-row">
    <div v-for="(slot, index) of deskSlots"
         class="relative bg-orange-400 border h-[160px] w-[114px] flex justify-center items-center font-bold text-3xl"
         @drop="emit('dropCardOnDesk', $event, slot, index)"
         @dragenter.prevent
         @dragover.prevent
    >
      <div v-if="!slot.attackCard"
           class="bg-indigo-400 h-[116px] w-[83px] flex justify-center items-center">
        {{ index }}
      </div>
      <template v-else>
        <game-card v-bind="slot.attackCard" />
        <game-card v-if="slot.defendCard" v-bind="slot.defendCard"
                   class="absolute inset-1/2 -translate-y-[42%] -translate-x-[35%] z-10"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DeskSlot } from "@/module/card-game/types";
import GameCard from "@/module/card-game/Card.vue";

const { deskSlots } = defineProps<{
  deskSlots: DeskSlot[]
}>();

const emit = defineEmits<{
  (e: "dropCardOnDesk", event: Event, slot: DeskSlot, index: number): void
}>();
</script>
