<template>
  <div class="hidden sm:flex">
    <div v-for="cardNumber of cardCount"
         :style="{'--x': 2.7 }"
         class=" h-[39px] w-[27px] bg-indigo-600 vertical-squares-pattern border flex items-end">
      <div
        class="bg-black text-white leading-5 w-1/2 flex justify-center items-center rounded border-white border m-0.5">
        {{ cardNumber }}
      </div>
    </div>
  </div>
  <div class="sm:hidden">
    <div
      class="bg-black text-white px-1.5 flex justify-center items-center rounded border-white border m-0.5">
      {{ cardCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";

const { enemy } = defineProps<{ enemy: Enemy }>();
const { cardCount } = enemy;
</script>
