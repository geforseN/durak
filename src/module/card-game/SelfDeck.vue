<template>
  <div class="flex w-full max-w-5xl border-neutral-900 border-2 p-2 bg-neutral justify-center rounded">
    <div v-if="!selfStore.self.cards.length" class="text-white">У вас нет карт!</div>
    <div v-else class="max-w-xl grid grid-flow-col auto-cols-fr justify-center">
      <self-card v-for="(card, index) of selfStore.self.cards" :key="card.suit + card.rank" v-bind="{ ...card, index }"
        @card-drag="handleCardDrag($event, card)" @card-drag-end="handleCardDragEnd($event, card)"
        @handle-card-drop-on-desk="(data) => emit('handleCardDropOnDesk', data)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SelfCard from "@/module/card-game/SelfCard.vue";
import { useGameSelfStore } from "@/stores/game/self.store";
import type { Card } from "@/module/card-game/types";

const emit = defineEmits<{
  (name: "cardDrag", $event: Event, card: Card): void
  (name: "cardDragEnd", $event: Event, card: Card): void
  (name: "handleCardDropOnDesk", data: { card: Card, slotIndex: number }): void
}>();

const selfStore = useGameSelfStore();

const handleCardDrag = (event: Event, card: Card) => {
  emit("cardDrag", event, card);
};
const handleCardDragEnd = (event: Event, card: Card) => {
  emit("cardDragEnd", event, card);
};
</script>
