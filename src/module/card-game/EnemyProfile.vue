<template>
  <section class="bg-gray-400 rounded flex gap-x-2 items-center p-1 border-4 border-black">
    <div class="avatar indicator p-2">
      <span v-show="isAllowedToMove" class="indicator-item border-black badge badge-secondary indicator-center w-full">
        {{ role === "Attacker" ? "Attacking" : role === "Defender" ? "Defending" : "_____" }}
      </span>
      <div class="w-16 h-16 rounded-xl relative ring ring-offset-1" :class="[
        role === 'Defender' && 'ring-blue-600 ring-offset-blue-300',
        role === 'Attacker' && 'ring-red-600 ring-offset-red-300',
        role === 'Player' && 'ring-gray-600 ring-offset-gray-300']">
        <img :src="info.photoUrl" :alt="`${info.nickname} profile picture`">
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex items-baseline gap-x-1">
        <a :href="info.personalLink"
           class="font-bold text-xl link text-black p-0 leading-normal">{{ info.nickname }}</a>
        <p class="text-xs opacity-50 TODO REMOVE_ME">{{ info.accname }}</p>
      </div>
      <div class="flex">
        <div v-for="cardNumber of cardCount"
             class="h-[39px] w-[27px] bg-indigo-600 border">
          {{ cardNumber }}
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
const { role, info, cardCount } = enemy;
</script>
