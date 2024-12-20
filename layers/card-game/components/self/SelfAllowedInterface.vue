<template>
  <div class="mb-4 flex items-baseline justify-center gap-2 text-xl">
    <span class="flex items-center justify-center gap-2 dark:text-white">
      Время твоего хода
    </span>
    <i-rivet-icons-happy />
    <button
      v-show="selfStore.self.canMakeMove"
      class="btn flex h-max flex-col bg-black text-white focus:outline-2 focus:outline-blue-300"
      :class="[
        canSelfEndPursuit && 'bg-rose-900',
        canSelfEndAttack && 'bg-rose-700',
        canSelfGaveUp && 'bg-rose-500',
        selfStore.self.isSurrendered && 'bg-rose-400',
      ]"
      @click="emit('stopMove')"
    >
      <span class="text-lg">{{ allowedActionMessage }}</span>
      <span class="text-xs/3">
        Нажмите <kbd class="kbd kbd-xs rounded bg-slate-700">S</kbd>
      </span>
    </button>
  </div>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import { computed } from "vue";
import { useGamePlayersStore, useGameSelfStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";

const emit = defineEmits<{
  stopMove: [];
}>();

const selfStore = useGameSelfStore();
const playersStore = useGamePlayersStore();

// TODO: refactor all computed below

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
  emit("stopMove");
});
</script>
