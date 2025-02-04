<template>
  <div
    aria-label="game-card"
    :style="{
      backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
    }"
    class="h-[77px] w-[55px] rounded border-base-content bg-base-100 bg-cover text-base-content xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px]"
  >
    {{ suit }}
    {{ rank }}
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { makeCardId } from "$/card-game/utils/card/make-card-id";
import type { Card } from "@durak-game/durak-dts";

const { rank, suit } = defineProps<Card>();

const id = computed(() => makeCardId(rank, suit));
</script>
