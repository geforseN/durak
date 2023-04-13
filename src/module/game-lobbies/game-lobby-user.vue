<template>
  <div
    class="grid grid-rows-[1fr_fit-content] flex-1 border-r-0 border-4 justify-center border-black bg-purple-200 relative"
  >
    <img
      :src="user.photoUrl"
      :alt="`${user.nickname} profile picture`"
      class="max-h-28 max-w-[28rem] block"
    />
    <router-link
      class="underline text-lg font-bold font-mono absolute bottom-0 left-[50%] translate-x-[-50%] "
      :class="isAdmin ? 'bg-yellow-300' : 'bg-white'"
      :to="`/profile/${user.personalLink}`"
      target="_blank"
    >
      {{ user.nickname }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/module/global-chat/types";

const { user, isAdmin } = defineProps<{ user: User, isAdmin: boolean }>();
</script>