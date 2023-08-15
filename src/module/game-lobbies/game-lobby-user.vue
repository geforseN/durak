<template>
  <article
    class="flex h-10 items-center justify-between gap-2 rounded-lg border-2 border-primary bg-gray-100 p-1 sm:grid sm:h-auto sm:grid-cols-[min-content_1fr] sm:grid-rows-[min-content_min-content_1fr]"
  >
    <span
      :class="user.isAdmin ? 'bg-info' : 'bg-success'"
      class="flex aspect-square h-full items-center justify-center rounded border border-black p-1 font-mono text-xl sm:col-start-1 sm:row-start-1 sm:h-6 sm:w-6"
    >
      {{ index }}
    </span>
    <router-link
      class="line-clamp-1 break-all text-xs font-bold hover:underline sm:col-span-full sm:row-start-2 sm:line-clamp-2 md:text-base lg:text-lg"
      :title="user.profile.nickname"
      :to="`/profile/${user.profile.personalLink}`"
      target="_blank"
    >
      {{ user.profile.nickname }}
    </router-link>
    <img
      :src="user.profile.photoUrl"
      :alt="`${user.profile.nickname} profile picture`"
      class="avatar h-full rounded-xl border border-black sm:col-start-2 sm:row-start-3 sm:h-auto sm:place-self-end"
    />
  </article>
</template>

<script setup lang="ts">
import type { LobbyUser } from "../global-chat/types";

const { user, index } = defineProps<{ user: LobbyUser; index: number }>();
</script>
