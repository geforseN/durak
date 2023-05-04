<template>
  <div class="max-w-5xl grid grid-cols-2 xs:grid-cols-3 grid-flow-row bg-primary justify-items-center">
    <div v-for="(slot, index) of deskSlots" :key="index" 
      class="relative flex justify-center items-center h-[83px] w-[60px] xxs:h-[116px] xxs:w-[83px] sm:h-[162px] sm:w-[116px] 
        font-bold text-3xl border sm:border-4 border-primary rounded" 
      @drop="emit('dropCardOnDesk', $event, slot, index)"
      @dragenter.prevent @dragover.prevent>
      <div v-if="!slot.attackCard" class="w-full h-full bg-info flex justify-center items-center">
        <span class="opacity-50">{{ index }}</span>
      </div>
      <template v-else>
        <game-card class="w-full h-full" :suit="slot.attackCard.suit" :rank="slot.attackCard.rank" />
        <game-card v-if="slot.defendCard" :suit="slot.defendCard.suit" :rank="slot.defendCard.rank"
          class="w-full h-full absolute inset-1/2 -translate-y-[42%] -translate-x-[35%] z-10" />
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
