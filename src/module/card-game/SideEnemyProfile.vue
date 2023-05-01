<template>
    <section class="flex rounded flex-col gap-x-2 items-center bg-primary overflow-hidden">
    <avatar :enemy="enemy" :is-allowed-to-move="isAllowedToMove" />
    <role-badge :enemy="enemy" />
    <card-number :enemy="enemy" />
    <router-link
      :to="`/profile/${info.personalLink}`"
      target="_blank"
      :title="info.nickname"
      class="link link-hover">
      <span class="font-bold line-clamp-3 break-all -------------------> w-8 <----------------------------">
        {{ info.nickname + info.nickname + info.nickname }}
      </span>
    </router-link>
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