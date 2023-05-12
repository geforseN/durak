<template>
  <div class="flex w-full max-w-5xl h-max border-neutral-900 border-2 p-2 bg-neutral justify-center rounded">
    <div v-if="!selfStore.self.cards.length" class="text-white">У вас нет карт!</div>
    <template v-else>
      <button v-for="card of selfStore.self.cards">
        <game-card
          class="hover:scale-125 transition ease-out"
          :key="card.suit + card.rank"
          v-bind="card"
          @card-drag="handleCardDrag($event, card)"
          @card-drag-end="handleCardDragEnd($event, card)" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import GameCard from "@/module/card-game/Card.vue";
import { useGameSelfStore } from "@/stores/game/self.store";
import type { Card } from "@/module/card-game/types";

const emit = defineEmits<{
  (name: "cardDrag", $event: Event, card: Card): void
  (name: "cardDragEnd", $event: Event, card: Card): void
}>();

const selfStore = useGameSelfStore();

const handleCardDrag = (event: Event, card: Card) => {
  emit("cardDrag", event, card);
};
const handleCardDragEnd = (event: Event, card: Card) => {
  emit("cardDragEnd", event, card);
};
</script>
