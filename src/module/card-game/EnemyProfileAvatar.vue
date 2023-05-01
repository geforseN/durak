<template>
  <div class="avatar indicator px-1.5 py-2 xs:p-2">
    <span
      v-show="isAllowedToMove"
      class="indicator-item border-black badge badge-secondary indicator-center w-full">
      {{ moveStatusText }}
    </span>
    <div
      class="rounded-xl relative ring ring-offset-1
      max-[240px]:w-8 max-[240px]:h-8 w-10 h-10 sm:w-16 sm:h-16"
      :class="roleStatusStyle">
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
const { role, info } = enemy;
const { photoUrl, nickname } = info;

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
const roleStatusStyle = computed(() => roleStyles[role] || "");
const moveStatusText = computed(() => roleStatuses[role] || "");
</script>
