<template>
  <section
    class="debug-screens relative grid w-[80px] grid-cols-[auto] grid-rows-[1fr_auto_auto] justify-items-end rounded border border-neutral-800 bg-primary p-2 grid-areas-[avatar,cards,nickname] xxs:w-[140px] xxs:grid-cols-2 xxs:grid-rows-none xxs:grid-areas-[avatar_cards,nickname_nickname] xs:w-[160px] sm:w-[210px]"
  >
    <avatar
      :info="enemy.info"
      class="grid-in-[avatar] xxs:justify-self-start"
    />
    <role-badge
      :kind="enemy.kind"
      class="absolute -bottom-4 right-[4px] grid-in-[role] xxs:left-2 xxs:right-0"
    />
    <div
      v-if="enemy.isAllowedToMove"
      class="absolute -bottom-4 left-10 rounded border border-black bg-neutral-500 px-1"
    >
      {{ Math.max(gameStateStore.count, 0).toPrecision(2) }}
    </div>
    <div
      class="m-2 grid auto-rows-[10px] grid-cols-6 pr-4 grid-in-[cards] xxs:mb-6 min-[400px]:-mr-1.5 min-[400px]:grid-cols-9 md:m-0 md:-mr-4 md:pr-6"
    >
      <stacked-cards :count="enemy.cardCount" />
    </div>
    <router-link
      :to="`/profile?personalLink${enemy.info.profile.personalLink}`"
      :title="enemy.info.profile.nickname"
      class="grid-in-[nickname] xxs:w-full"
    >
      <span
        class="link-hover link mt-3 line-clamp-2 break-all text-xs font-bold xxs:line-clamp-1 xs:text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl"
      >
        {{ enemy.info.profile.nickname }}
      </span>
    </router-link>
  </section>
</template>
<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";
import Avatar from "@/module/card-game/EnemyProfileAvatar.vue";
import StackedCards from "@/module/card-game/EnemyProfileStackedCards.vue";
import RoleBadge from "@/module/card-game/EnemyProfileRoleBadge.vue";
import { useGameStateStore } from "@/stores/game";

const gameStateStore = useGameStateStore();

const { enemy } = defineProps<{
  enemy: Enemy;
}>();
</script>
