<template>
  <div class="bg-gray-900 w-full flex justify-center">
    <span v-if="isAllowedToMove">ALLOWED</span>
    <template v-if="selfStore.self.cards.length > 0">
      <game-card
        v-for="card of selfStore.self.cards"
        :rank="card.rank"
        :suit="card.suit"
        @card-drag="handleCardDrag"
        @card-drag-end="handleCardDragEnd"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameCard, { type Card } from "@/module/card-game/Card.vue";
import { useGameSelfStore } from "@/stores/game/self.store";

const { isAllowedToMove } = defineProps<{ isAllowedToMove: boolean }>();
const emit = defineEmits<{
  (name: "cardDrag", $event: Event, card: Card): void
  (name: "cardDragEnd", $event: Event, card: Card): void
}>();

const selfStore = useGameSelfStore();

const handleCardDrag = (event: Event, card: Card) => {
  emit("cardDrag", event, card);
}
const handleCardDragEnd = (event: Event, card: Card) => {
  emit("cardDragEnd", event, card)
};
</script>
