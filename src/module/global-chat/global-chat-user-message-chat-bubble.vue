<template>
  <div
    class="chat-bubble flex flex-col break-all p-2 pb-1"
    :class="isMyMessage ? 'items-end bg-neutral-600' : 'items-start'"
  >
    <div class="flex flex-wrap items-baseline gap-1">
      <span
        class="badge rounded-sm border-0 bg-black p-1 font-bold"
        :class="isMyMessage && 'hidden'"
      >
        {{ sender.profile.nickname }}
      </span>
      <time class="text-xs opacity-50">{{ formattedDate }}</time>
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
