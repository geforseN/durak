<template>
  <div class="grid grid-flow-col grid-cols-[max-content_1fr_max-content]">
    <router-link :to="'profile/' + message.sender.personalLink" class="bold block underline flex">
      <img :src="message.sender.photoUrl" :alt="`${message.sender.nickname} profile picture`" class="max-h-8 aspect-square">
      {{ message.sender.nickname }}:
    </router-link>
    <p class="hyphens ml-1 break-all bg-blue-400">
      {{ message.text }}
    </p>
    <span class="opacity-40 justify-self-end pr-2">
      {{ message.date }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { UserMessage } from "@/module/global-chat/types";

const { message } = defineProps<{ message: UserMessage }>();
</script>

<style scoped>
.hyphens {
  overflow-wrap: break-word;
  hyphens: manual;
}
</style>
