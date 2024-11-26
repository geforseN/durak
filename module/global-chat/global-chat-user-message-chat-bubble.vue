<template>
  <div
    class="chat-bubble flex flex-col break-all p-2 pb-1"
    :class="isMyMessage ? 'items-end' : 'items-start'"
  >
    <div class="flex flex-wrap items-baseline gap-1">
      <span
        v-if="!isMyMessage"
        class="badge rounded-sm border-0 bg-black p-1 font-bold text-white"
      >
        {{ sender.profile.nickname }}
      </span>
      <time class="text-xs opacity-90">{{ formattedDate }}</time>
    </div>
    <span class="ml-0.5">{{ text }}</span>
  </div>
</template>
<script setup lang="ts">
import type { UserMessage } from "./types";

const { message, isMyMessage } = defineProps<{
  isMyMessage: boolean;
  message: UserMessage;
}>();
const { sender, formattedDate, text } = message;
</script>
