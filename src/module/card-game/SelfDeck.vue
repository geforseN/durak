<template>
  <div
    class="flex w-full max-w-5xl border-neutral-900 border-2 p-2 bg-neutral justify-center rounded"
  >
    <div v-if="!selfStore.self.cards.length" class="text-white">
      У вас нет карт!
    </div>
    <div v-else class="max-w-xl grid grid-flow-col auto-cols-fr justify-center">
      <self-card
        v-for="(card, index) of selfStore.self.cards"
        :key="card.suit + card.rank"
        :rank="card.rank"
        :suit="card.suit"
        :index="index"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SelfCard from "@/module/card-game/SelfCard.vue";
import { useGameSelfStore } from "@/stores/game/self.store";

const selfStore = useGameSelfStore();
</script>
