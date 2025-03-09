<template>
  <div
    class="flex w-3/4 max-w-5xl justify-center rounded border-2 border-neutral-900 bg-neutral p-2 text-neutral-content"
  >
    <div v-if="isEmpty" class="text-center">У вас нет карт!</div>
    <div v-else class="grid max-w-xl auto-cols-fr grid-flow-col justify-center">
      <slot v-for="card of cards" v-bind="card" />
    </div>
  </div>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import type { _Suit, Card } from "@durak-game/durak-dts";
import { computed, type Slot } from "vue";

const props = defineProps<{
  cards: Card[];
  trumpSuit: _Suit;
}>();

type XCard = Card & {
  id: string;
  index: number;
  isTrump: boolean;
};

defineSlots<{
  default: Slot<XCard>;
}>();

const isEmpty = computed(() => props.cards.length === 0);

const cards = computed(() =>
  props.cards.map(
    (card, index) =>
      ({
        id: makeCardId(card.rank, card.suit),
        suit: card.suit,
        rank: card.rank,
        index,
        isTrump: card.suit === props.trumpSuit,
      }) satisfies XCard,
  ),
);
</script>
