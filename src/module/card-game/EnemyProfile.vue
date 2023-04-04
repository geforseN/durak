<template>
  <section class="bg-gray-400 relative">
    <div class="flex border-4 border-black">
      <img class="w-24 h-24"
           :src="enemy.info.photoUrl"
           :alt="`${enemy.info.nickname} profile picture`"
      >
      <div class="flex flex-col justify-between">
        <div class="mx-0.5">
          <a :href="enemy.info.personalLink" class="font-bold text-xl underline">{{ enemy.info.nickname }}</a>
          <p class="text-xs opacity-50">{{ enemy.info.accname }}</p>
          <p class="text-xs opacity-50 bg-orange-400">{{ enemy.role }}</p>
          <span v-if="isAllowedToMove">ALLOWED</span>
        </div>
        <div class="flex ml-0.5">
          <div v-for="cardNumber of enemy.cardCount" class="h-[39px] w-[27px] bg-indigo-600 border">
            {{ cardNumber }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";

const { enemy, isAllowedToMove } = defineProps<{
  enemy: Enemy,
  isAllowedToMove: boolean
}>();
</script>
