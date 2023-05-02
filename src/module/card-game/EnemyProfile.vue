<template>
  <section class="flex items-center gap-x-2 rounded-xl bg-purple-300 border border-black 
  sm:border-2 sm:p-2">
    <avatar :enemy="enemy" :is-allowed-to-move="isAllowedToMove" />
    <div class="flex flex-col items-start">
      <div class="flex items-center justify-between">
        <router-link :to="`/profile/${info.personalLink}`" target="_blank" :title="info.nickname" class="link link-hover">
          <span class="font-bold line-clamp-3 break-all">
            {{ info.nickname + info.nickname + info.nickname }}
          </span>
        </router-link>
        <role-badge :role="enemy.role" />
      </div>
      <div class="flex">
        <stacked-cards :count="enemy.cardCount" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";
import Avatar from "@/module/card-game/EnemyProfileAvatar.vue";
import StackedCards from "@/module/card-game/EnemyProfileStackedCards.vue";
import RoleBadge from "@/module/card-game/EnemyProfileRoleBadge.vue";

const { enemy, isAllowedToMove } = defineProps<{
  enemy: Enemy,
  isAllowedToMove: boolean
}>();
const { info } = enemy;
</script>
