<template>
  <div class="avatar indicator p-2">
      <span
        v-show="isAllowedToMove"
        class="indicator-item border-black badge badge-secondary indicator-center w-full">
        {{ moveStatus }}
      </span>
    <div
      class="w-10 h-10 sm:w-16 sm:h-16 rounded-xl relative ring ring-offset-1"
      :class="roleClass">
      <img :src="photoUrl" :alt="`${nickname} profile picture`">
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { Enemy, PlayerRole } from "@/module/card-game/types";

const { enemy, isAllowedToMove } = defineProps<{
  enemy: Enemy,
  isAllowedToMove: boolean
}>();
const { role, info: { photoUrl, nickname } } = enemy;

const roleStyles: Record<PlayerRole, string> = {
  "Defender": "ring-blue-600 ring-offset-blue-300",
  "Attacker": "ring-red-600 ring-offset-red-300",
  "Player": "ring-gray-600 ring-offset-gray-300",
};
const roleStatuses: Record<PlayerRole, string> = {
  "Attacker": "Attacking",
  "Defender": "Defending",
  "Player": "",
};
const roleClass = computed(() => roleStyles[role] || "");
const moveStatus = computed(() => roleStatuses[role] || "");
</script>
