<template>
  <div class="flex justify-center items-baseline mb-4 text-xl gap-2">
    <span class="flex gap-2 justify-center items-center dark:text-white">
      Время твоего хода
    </span>
    <i-rivet-icons-happy />  
    <button
      v-show="selfStore.self.canMakeMove"
      class="btn flex flex-col h-max text-white bg-black focus:outline-2 focus:outline-blue-300"
      :class="[
        canSelfEndPursuit && 'bg-rose-900',
        canSelfEndAttack && 'bg-rose-700',
        canSelfGaveUp && 'bg-rose-500',
        selfStore.self.isSurrendered && 'bg-rose-400',
      ]"
      @click="durakGame.stopMove"
    >
      <span class="text-lg">{{ allowedActionMessage }}</span>
      <span class="text-xs/3">Нажмите <kbd class="kbd kbd-xs bg-slate-700 rounded">S</kbd></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGamePlayersStore, useGameSelfStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";
import { useSharedDurakGame } from "$/card-game/composable/useDurakGame";

const durakGame = useSharedDurakGame();
const selfStore = useGameSelfStore();
const playersStore = useGamePlayersStore();

// TODO
// TODO
// TODO
// TODO
// REFACTOR all computed below

const canSelfEndPursuit = computed(
  () => playersStore.hasSurrenderedDefender && selfStore.self.canMakeAttackMove,
);
const canSelfEndAttack = computed(
  () =>
    !playersStore.hasSurrenderedDefender && selfStore.self.canMakeAttackMove,
);
const canSelfGaveUp = computed(
  () =>
    !playersStore.hasSurrenderedDefender && selfStore.self.canMakeAttackMove,
);

const allowedActionMessage = computed(() => {
  if (canSelfEndPursuit.value) return "Закончить добивание";
  if (canSelfEndAttack.value) return "Закончить атаку";
  if (canSelfGaveUp.value) return "Сдаться";
  if (selfStore.self.isSurrendered) {
    // REVIEW - should thing about it
    // probably, allowed player should never see this message
    return "__Забрать карты__";
  }
  return "Закончить ход";
});

useEventListener("keyup", (event) => {
  if (event.code !== "KeyS") {
    return;
  }
  durakGame.stopMove();
});
</script>
