<template>
  <div class="bg-gray-900 w-full flex justify-center">
    <span v-if="isAllowedToMove">ALLOWED</span>
    <template v-if="selfStore.self.cards.length > 0">
      <durak-card v-for="card of selfStore.self.cards" v-bind="card" @card-drag="handleCardDrag" />
    </template>
  </div>
</template>

<script setup lang="ts">
import DurakCard, { type Card } from "@/module/card-game/Card.vue";
import { useGameSelfStore } from "@/stores/game/self.store";

const { isAllowedToMove } = defineProps<{ isAllowedToMove: boolean }>();
const emit = defineEmits<{ (name: "cardDrag", $event: Event, card: Card): void }>();

const selfStore = useGameSelfStore();

const handleCardDrag = (event: Event, card: Card) => emit("cardDrag", event, card);
</script>
