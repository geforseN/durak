<template>
  <div class="w-full max-w-5xl">
    <div v-if="selfStore.self.cards?.length > 0"
      class="h-max border-black border-2 w-full p-2 flex bg-primary justify-center rounded">
      <game-card
        class="hover:scale-125 transition ease-out"
        v-for="card of selfStore.self.cards"
        :key="card.suit + card.rank"
        :rank="card.rank"
        :suit="card.suit"
        @card-drag="handleCardDrag($event, card)"
        @card-drag-end="handleCardDragEnd($event, card)"
      />
    </div>
    <div v-else>У вас нет карт!</div>
  </div>
</template>

<script setup lang="ts">
import GameCard, { type Card } from "@/module/card-game/Card.vue";
import { useGameSelfStore } from "@/stores/game/self.store";

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
