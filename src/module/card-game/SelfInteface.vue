<template>
  <button
    v-show="selfStore.canMakeMove"
    @click="stopMove"
    class="col-start-2 btn btn-sm text-white bg-black" :class="[
      canEndPursuit && 'bg-rose-900',
      canEndAttack && 'bg-rose-700',
      canGaveUp && 'bg-rose-500',
      isGaveUp && 'bg-rose-400'
    ]">
    {{ message ?? "Закончить ход" }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameSelfStore, useGameStateStore } from "@/stores/game";

const gameStateStore = useGameStateStore();
const selfStore = useGameSelfStore();

const canEndPursuit = computed(() => gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeAttackMove);
const canEndAttack = computed(() => !gameStateStore.gameState.isDefenderGaveUp && selfStore.canMakeAttackMove);
const canGaveUp = computed(() => selfStore.canMakeDefenseMove && !gameStateStore.gameState.isDefenderGaveUp);
const isGaveUp = computed(() => selfStore.canMakeDefenseMove && gameStateStore.gameState.isDefenderGaveUp);

const message = computed(() => {
  if (canEndPursuit.value) return "Закончить добивание";
  if (canEndAttack.value) return "Закончить атаку";
  if (canGaveUp.value) return "Сдаться";
  if (isGaveUp.value) return "__Забрать карты__";
});

const emit = defineEmits<{ (e: "stopMove"): void }>();

const stopMove = () => emit("stopMove");
</script>
