<template>
  <section
    class="relative grid w-[80px] grid-cols-[auto] grid-rows-[1fr_auto_auto] justify-items-end rounded border border-neutral-800 bg-primary p-2 grid-areas-[avatar,cards,nickname] xxs:w-[140px] xxs:grid-cols-2 xxs:grid-rows-none xxs:grid-areas-[avatar_cards,nickname_nickname] xs:w-[160px] sm:w-[210px]"
  >
    <enemy-avatar
      :src="enemy.info.profile.photoUrl"
      :alt="`${enemy.info.profile.nickname} profile picture`"
      class="grid-in-[avatar] xxs:justify-self-start"
    />
    <enemy-kind-badge
      :kind="enemy.kind"
      :has-timer="true"
      class="absolute -bottom-4 right-[4px] grid-in-[role] xxs:left-2 xxs:right-0"
    />
    <enemy-stacked-cards :count="enemy.cardCount" />
    <router-link
      :to="`/profile/${enemy.info.profile.personalLink}`"
      :title="enemy.info.profile.nickname"
      class="grid-in-[nickname] xxs:w-full"
    >
      <span
        class="link-hove link mt-3 line-clamp-2 break-all text-xs font-bold xxs:line-clamp-1 xs:text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl"
      >
        {{ enemy.info.profile.nickname }}
      </span>
    </router-link>
  </section>
</template>
<script setup lang="ts">
import EnemyAvatar from "$/card-game/components/enemy/EnemyProfileAvatar.vue";
import EnemyStackedCards from "$/card-game/components/enemy/EnemyProfileStackedCards.vue";
import EnemyKindBadge from "$/card-game/components/enemy/EnemyProfileKindBadge.vue";
import type { Enemy } from "@durak-game/durak-dts";

const { enemy } = defineProps<{
  enemy: Enemy;
}>();
</script>
