<template>
  <div
    :style="{ 'backgroundImage': `url(https://deckofcardsapi.com/static/img/${cardId}.png)` }"
    draggable="true" @dragstart="emit('cardDrag', $event, { rank, suit })"
    @dragend.prevent="emit('cardDragEnd', $event, { rank, suit })"
    class="h-[116px] w-[83px] border-2 border-black rounded bg-cover bg-black"></div>
</template>

<script setup lang="ts">
import type { Rank, Suit } from "@/module/card-game/types";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import { computed } from "vue";

export type Card = {
  rank: Rank,
  suit: Suit,
  power?: number
}
const props = defineProps<Card>();
const cardId = computed(() => `${props.rank.at(-1)}${suitsDictionary[props.suit]}`)

const emit = defineEmits<{
  (e: "cardDrag", $event: Event, card: Card): void
  (e: "cardDragEnd", $event: Event, card: Card): void
}>();

</script>
