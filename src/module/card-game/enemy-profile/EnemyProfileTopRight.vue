<template>
  <section
    class="relative grid w-[80px] grid-cols-[auto] grid-rows-[1fr_auto_auto] justify-items-start rounded border border-neutral-800 bg-primary p-2 grid-areas-[avatar,cards,nickname] xxs:w-[140px] xxs:grid-cols-2 xxs:grid-rows-none xxs:grid-areas-[cards_avatar,nickname_nickname] xs:w-[160px] sm:w-[210px]"
  >
    <avatar :info="enemy.info" class="grid-in-[avatar] xxs:justify-self-end" />
    <role-badge
      :kind="enemy.kind"
      :class="isAllowedToMove && 'animate-pulse'"
      class="absolute -bottom-4 left-[1px] w-14 grid-in-[role] xxs:left-2"
    />
    <div
      class="m-2 grid auto-rows-[10px] grid-cols-6 grid-in-[cards] min-[400px]:grid-cols-9 sm:mb-6 md:m-0 md:ml-4"
    >
      <stacked-cards :count="enemy.cardCount" />
    </div>
    <router-link
      :to="`/profile?personalLink${enemy.info.personalLink}`"
      target="_blank"
      :title="enemy.info.nickname"
      class="grid-in-[nickname] xxs:flex xxs:w-full xxs:justify-end"
    >
      <span
        class="link-hover link mt-3 line-clamp-2 break-all text-xs font-bold xxs:line-clamp-1 xs:text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl"
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
