<template>
  <main
    class="min-h-[90vh] flex flex-col justify-evenly items-center bg-secondary dark:bg-secondary-content gap-y-2"
  >
    <game-field />
    <self-data />
  </main>
  <div
    class="grid absolute top-1.5 right-14 bg-primary border-black divide-black divide-y-2 border-2"
  >
    <span class="bg-gray-500 w-full"
      >{{ gameStateStore.round.number }} раунд</span
    >
    <span
      :class="[
        selfStore.self.isDefender && 'bg-blue-600',
        selfStore.self.isAttacker && 'bg-red-600',
      ]"
    >
      {{ selfStore.self.kind }}
    </span>
  </div>
</template>
<script setup lang="ts">
import GameField from "@/module/card-game/GameField.vue";
import SelfData from "@/module/card-game/SelfData.vue";
import { useGameStateStore, useGameSelfStore } from "@/stores/game";

const selfStore = useGameSelfStore();
const gameStateStore = useGameStateStore();
</script>
