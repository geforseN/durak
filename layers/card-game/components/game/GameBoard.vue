<template>
  <div
    class="grid max-w-xs grid-cols-2 place-items-center gap-y-3 rounded-xl border-2 border-neutral-900 bg-neutral p-2 py-5 xs:max-w-md lg:max-w-none lg:grid-cols-[150px_1fr_150px]"
  >

  </div>
</template>

<script setup lang="ts">
import GameDesk from "$/card-game/components/game/GameDesk.vue";
import GameTalon from "$/card-game/components/game/GameTalon.vue";
import GameDiscard from "$/card-game/components/game/GameDiscard.vue";
import { useGameStateStore, useGameDeskStore } from "@/stores/game";
import { computed } from "vue";
import { useEventBus } from "@vueuse/core";

const slotDropEvent = useEventBus<number>("game:slot-drop");

const gameStateStore = useGameStateStore();
const deskStore = useGameDeskStore();

const discard = computed(() => ({
  isEmpty: gameStateStore.discard.isEmpty,
}));

const talon = computed(() => ({
  isEmpty: gameStateStore.talon.isEmpty,
  hasOneCard: gameStateStore.talon.hasOneCard,
  trumpCard: gameStateStore.talon.trumpCard,
}));

const desk = computed(() => ({
  slots: deskStore.slots,
}))
</script>
