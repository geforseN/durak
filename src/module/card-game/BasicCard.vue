<template>
  <div :style="{ 'backgroundImage': `url(https://deckofcardsapi.com/static/img/${cardId}.png)` }"
    class="h-[77px] w-[55px] xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px] border-2 border-black rounded bg-cover bg-black">
  </div>
</template>
  
<script setup lang="ts">
import type { Rank, Suit } from "@/module/card-game/types";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import { computed } from "vue";

const props = defineProps<{
  rank: Rank,
  suit: Suit,
}>();

const cardId = computed(() => {
  const rankChar = props.rank === "10" ? "0" : props.rank;
  return `${rankChar}${suitsDictionary[props.suit]}`
})
defineExpose({ cardId });
</script>