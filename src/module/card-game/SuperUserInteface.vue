<template>
  <div class="flex font-bold justify-evenly">
    <div v-if="gameUI.attackStatus !== 'hidden'" :class="gameUI.attackStatus === 'freeze' && 'opacity-50'"
         class="border-2 border-black flex justify-center items-center gap-x-1">
      <button class="w-full h-full bg-red-600 px-2 " @click="stopMove">
        Закончить атаку
      </button>
    </div>
    <div v-if="gameUI.defendStatus !== 'hidden'" :class="gameUI.defendStatus === 'freeze' && 'opacity-50'"
         class="border-2 border-black flex justify-center items-center gap-x-1">
      <button class="w-full h-full bg-red-600 px-2 " @click="stopMove">
        Забрать карты
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameUIStore } from "@/stores/game/gameUI.store";

const gameUI = useGameUIStore();
const emit = defineEmits<{
  (e: "stopMove"): void
}>()

const stopMove = () => emit("stopMove");
</script>
