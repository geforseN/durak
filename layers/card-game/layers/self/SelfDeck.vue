<template>
  <div
    class="flex w-full max-w-5xl justify-center rounded border-2 border-neutral-900 bg-neutral p-2"
  >
    <div
      v-if="isEmpty"
      class="text-white"
    >
      У вас нет карт!
    </div>
    <div
      v-else
      class="grid max-w-xl auto-cols-fr grid-flow-col justify-center"
    >
      <self-card
        v-for="card of cards"
        :key="card.id"
        v-bind="card"
      />
    </div>
  </div>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import SelfCard from "$/card-game/layers/self/card/SelfCard.vue";
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import type { Card } from "@durak-game/durak-dts";
import { computed } from "vue";

const props = defineProps<{
  cards: Card[];
}>();

const isEmpty = computed(() => props.cards.length === 0);

const cards = computed(() =>
  props.cards.map((card, index) => ({
    id: makeCardId(card.rank, card.suit),
    suit: card.suit,
    rank: card.rank,
    index,
  })),
);
</script>
