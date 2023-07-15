<template>
  <section class="relative grid py-2 px-1 md:p-2 justify-items-start w-[60px] min-[400px]:w-[80px] sm:w-[120px] md:w-[210px] bg-primary border border-neutral-800 rounded 
    grid-areas-[avatar,cards,nickname] grid-cols-[auto] grid-rows-[1fr_auto_auto] 
    md:grid-areas-[cards_avatar,nickname_nickname] md:grid-cols-2">
    <avatar :info="enemy.info" class="grid-in-[avatar] md:justify-self-end" />
    <role-badge :role="enemy.role" :class="isAllowedToMove && 'animate-pulse'"
      class="grid-in-[role] absolute -bottom-4 left-[1px] w-14 md:left-2" />
    <div class="grid-in-[cards] m-2 sm:mb-6 md:m-0 md:ml-4 grid auto-rows-[10px] grid-cols-6 min-[400px]:grid-cols-9">
      <stacked-cards :count="enemy.cardCount" />
    </div>
    <router-link :to="`/profile/${enemy.info.personalLink}`" target="_blank" :title="enemy.info.nickname"
      class="grid-in-[nickname] md:w-full md:flex md:justify-end">
      <span
        class="mt-3 link-hover link break-all line-clamp-3 sm:line-clamp-2 md:line-clamp-1 font-bold text-xs xs:text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl">
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