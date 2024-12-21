<template>
  <div
    :style="{
      backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
    }"
    class="h-[77px] w-[55px] rounded border-2 border-black bg-black bg-cover xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px]"
  />
</template>
<script setup lang="ts">
import { computed } from "vue";
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import type { Card } from "@durak-game/durak-dts";

const { rank, suit } = defineProps<Card>();

const id = computed(() => makeCardId(rank, suit));
</script>
