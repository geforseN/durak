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
      <!-- 
        @drop-on-desk="durakGame.selfDraggedCard.onDeskDrop(card.index)"
        @dragstart="durakGame.selfDraggedCard.onDrag(card)"
        @dragend.prevent="durakGame.selfDraggedCard.onDragEnd()"
      
-->
    </div>
  </div>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import SelfCard from "$/card-game/layers/self/card/SelfCard.vue";
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import { useGameDeskStore } from "@/stores/game";
import type { Card } from "@durak-game/durak-dts";
import { computed, provide } from "vue";

const gameDeskStore = useGameDeskStore();

provide(
  "deskSlotKeys",
  computed(() => Array.from(gameDeskStore.slots).map((_, index) => index + 1)),
);

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
