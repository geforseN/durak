<template>
  <section
    class="sm:max-w-max flex items-center gap-x-2 rounded-xl bg-purple-300 sm:p-2 border-black border sm:border-2">
    <avatar :enemy="enemy" :is-allowed-to-move="isAllowedToMove" />
    <div class="flex flex-col items-start overflow-hidden ">
      <div class="flex items-center justify-between">
        <router-link
          :to="`/profile/${info.personalLink}`"
          target="_blank"
          :title="info.nickname"
          class="link link-hover">
          <span class="font-bold line-clamp-3 break-all">
            {{ info.nickname + info.nickname + info.nickname }}
          </span>
        </router-link>
        <role-badge :enemy="enemy" />
      </div>
      <card-number :enemy="enemy" />
    </div>
  </section>
  
</template>
<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";
import Avatar from "@/module/card-game/EnemyProfileAvatar.vue";
import CardNumber from "@/module/card-game/EnemyProfileCardNumber.vue";
import RoleBadge from "@/module/card-game/EnemyProfileRoleBadge.vue";

const { enemy, isAllowedToMove } = defineProps<{
  enemy: Enemy,
  isAllowedToMove: boolean
}>();
const { info } = enemy;
</script>
