<template>
  <article class="p-1 border-2 border-primary rounded-lg bg-gray-100" >
    <span
      :class="isAdmin ? 'bg-info' : 'bg-success'"
      class="h-full sm:w-6 sm:h-6 sm:col-start-1 sm:row-start-1 flex justify-center items-center p-1 font-mono text-xl border border-black rounded ">
      {{ index }}
    </span>
    <router-link
      class="font-bold line-clamp-1 sm:line-clamp-2 text-xs md:text-base lg:text-lg break-all hover:underline
      sm:col-span-full sm:row-start-2"
      :title="user.nickname"
      :to="`/profile/${user.personalLink}`"
      target="_blank"
    >
      {{ user.nickname  }}
    </router-link>
    <img :src="user.photoUrl" :alt="`${user.nickname} profile picture`"
         class="h-full sm:h-auto sm:place-self-end sm:col-start-2 sm:row-start-3 avatar border border-black rounded-xl" />
  </article>
</template>

<script setup lang="ts">
import type { User } from "@/module/global-chat/types";

const { user, isAdmin, index } =
  defineProps<{ user: User, isAdmin: boolean, index: number }>();
</script>