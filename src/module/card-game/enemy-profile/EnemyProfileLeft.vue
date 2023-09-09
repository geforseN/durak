<template>
  <section
    class="relative grid w-[60px] grid-cols-[auto] grid-rows-[1fr_auto_auto] justify-items-end rounded border border-neutral-800 bg-primary px-1 py-2 grid-areas-[avatar,cards,nickname] min-[400px]:w-[80px] sm:w-[120px] md:w-[210px] md:grid-cols-2 md:grid-rows-none md:p-2 md:grid-areas-[avatar_cards,nickname_nickname]"
  >
    <avatar :info="enemy.info" class="grid-in-[avatar] md:justify-self-start" />
    <role-badge
      :kind="enemy.kind"
      :class="isAllowedToMove && 'animate-pulse'"
      class="absolute -bottom-4 right-[1px] w-14 grid-in-[role] md:right-2"
    />
    <div
      class="m-2 grid auto-rows-[10px] grid-cols-6 grid-in-[cards] min-[400px]:-mr-1.5 min-[400px]:grid-cols-9 sm:-mr-6 sm:mb-6 md:m-0 md:-mr-4"
    >
      <stacked-cards :count="enemy.cardCount" />
    </div>
    <router-link
      :to="`/profile?personalLink${enemy.info.personalLink}`"
      target="_blank"
      :title="enemy.info.nickname"
      class="grid-in-[nickname] md:w-full"
    >
      <span
        class="link-hover link mt-3 line-clamp-3 break-all text-xs font-bold xs:text-sm sm:line-clamp-2 sm:text-base md:line-clamp-1 md:text-lg xl:text-xl 2xl:text-2xl"
      >
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
