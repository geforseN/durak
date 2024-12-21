<template>
  <div
    :style="{
      backgroundImage: `url(https://deckofcardsapi.com/static/img/${cardId}.png)`,
    }"
    class="h-[77px] w-[55px] rounded border-2 border-black bg-black bg-cover xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px]"
  />
</template>
<script setup lang="ts">
import type { Rank, Suit } from "$/card-game/types";
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import { computed } from "vue";

const props = defineProps<{
  rank: Rank;
  suit: Suit;
}>();

const cardId = computed(() => makeCardId(props.rank, props.suit));
</script>
