<template>
  <div
    v-if="selfStore.self.id === gameStateStore.allowedPlayerId"
    class="flex justify-center items-baseline mb-4 text-xl gap-2"
  >
    <span class="flex gap-2 justify-center items-center dark:text-white">
      Время твоего хода
    </span>
    <emoji-happy class="dark:fill-white" />
    <span class="dark:text-white">
      У тебя есть
      {{ Math.max(gameStateStore.count, 0).toPrecision(2) }}
      секунд на ход
    </span>
    <button
      v-show="selfStore.canMakeMove"
      @click="stopMove"
      class="btn flex flex-col h-max text-white bg-black focus:outline-2 focus:outline-blue-300"
      :class="[
        canEndPursuit && 'bg-rose-900',
        canEndAttack && 'bg-rose-700',
        canGaveUp && 'bg-rose-500',
        isGaveUp && 'bg-rose-400',
      ]"
    >
      <span class="text-lg">{{ message ?? "Закончить ход" }}</span>
      <span class="text-xs/3"
        >Нажмите <kbd class="kbd kbd-xs bg-slate-700 rounded">S</kbd></span
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameSelfStore, useGameStateStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";
import EmojiHappy from "@/components/svg/EmojiHappy.vue";
import { useSharedDurakGame } from "@/module/card-game/composable/useDurakGame";

const { stopMove } = useSharedDurakGame();
const gameStateStore = useGameStateStore();
const selfStore = useGameSelfStore();

const canEndPursuit = computed(
  () =>
    gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeAttackMove,
);
const canEndAttack = computed(
  () =>
    !gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeAttackMove,
);
const canGaveUp = computed(
  () =>
    !gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeDefenseMove,
);
const isGaveUp = computed(
  () =>
    gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeDefenseMove,
);

const message = computed(() => {
  if (canEndPursuit.value) return "Закончить добивание";
  if (canEndAttack.value) return "Закончить атаку";
  if (canGaveUp.value) return "Сдаться";
  if (isGaveUp.value) return "__Забрать карты__";
  throw new Error("Could not set message in self interface");
});

useEventListener("keyup", (event) => {
  if (event.code === "KeyS") stopMove();
});
</script>
