<template>
  <section class="relative grid justify-items-start bg-primary border border-neutral-800 rounded p-2 w-[80px] xxs:w-[140px] xs:w-[160px] sm:w-[210px]
    grid-areas-[avatar,cards,nickname] grid-cols-[auto] grid-rows-[1fr_auto_auto] 
    xxs:grid-areas-[cards_avatar,nickname_nickname] xxs:grid-cols-2 xxs:grid-rows-none">
    <avatar :info="enemy.info" class="grid-in-[avatar] xxs:justify-self-end" />
    <role-badge :role="enemy.role" :class="isAllowedToMove && 'animate-pulse'"
      class="grid-in-[role] absolute -bottom-4 right-[1px] w-14 xxs:right-2" />
    <div class="grid-in-[cards] m-2 sm:mb-6 md:m-0 md:ml-4 grid auto-rows-[10px] grid-cols-6 min-[400px]:grid-cols-9">
      <stacked-cards :count="enemy.cardCount" />
    </div>
    <router-link :to="`/profile/${enemy.info.personalLink}`" target="_blank" :title="enemy.info.nickname"
      class="grid-in-[nickname] xxs:w-full xxs:flex xxs:justify-end">
      <span
        class="mt-3 link-hover link break-all line-clamp-2 xxs:line-clamp-1 font-bold text-xs xs:text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
        {{ enemy.info.nickname }}
      </span>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { Enemy } from "@/module/card-game/types";
import Avatar from "@/module/card-game/EnemyProfileAvatar.vue";
import StackedCards from "@/module/card-game/EnemyProfileStackedCards.vue";
import RoleBadge from "@/module/card-game/EnemyProfileRoleBadge.vue";

const props = defineProps<{
  enemy: Enemy;
  isAllowedToMove: boolean;
}>();
const { enemy, isAllowedToMove } = toRefs(props);
</script>