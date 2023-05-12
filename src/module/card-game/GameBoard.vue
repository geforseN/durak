<template>
  <div
    class="w-full max-w-xs xs:max-w-md py-5 rounded-xl p-2 flex gap-y-3 flex-col items-center bg-neutral border-neutral-900 border-2">
    <div class="grid grid-cols-2 w-full">
      <game-discard class="col-start-1" />
      <game-talon class="col-start-2 justify-self-end"  />
    </div>
    <game-desk :desk-slots="deskStore.deskSlots" @drop-card-on-desk="props.handleCardDropOnDesk" />
  </div>
</template>

<script setup lang="ts">
import { useGameDeskStore } from '@/stores/game';
import GameDesk from '@/module/card-game/GameDesk.vue';
import GameTalon from '@/module/card-game/GameTalon.vue';
import GameDiscard from '@/module/card-game/GameDiscard.vue';

const props = defineProps<{ handleCardDropOnDesk: Function }>();
const deskStore = useGameDeskStore();
</script>