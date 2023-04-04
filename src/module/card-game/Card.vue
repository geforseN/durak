<template>
  <div
    :style="{'backgroundImage':`url(https://deckofcardsapi.com/static/img/${card.rank.at(-1)}${suitsDictionary[card.suit]}.png)`}"
    draggable="true"
    @dragstart="emit('cardDrag', $event, card)"
    class="border-2 border-black h-[116px] w-[83px] rounded hover:scale-125 transition ease-out bg-cover bg-black"
  />
</template>

<script setup lang="ts">
import type { Rank, Suit } from "@/module/card-game/types";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";

export type Card = {
  rank: Rank,
  suit: Suit,
  power?: number
}
const card = defineProps<Card>();
const emit = defineEmits<{
  (e: "cardDrag", $event: Event, card: Card): void
}>();

</script>
