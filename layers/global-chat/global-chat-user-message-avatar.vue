<template>
  <div class="chat-image avatar w-12" :class="isMyMessage ? 'hidden' : 'pl-2'">
    <div class="rounded">
      <img
        :src="message.sender.profile.photoUrl"
        :alt="`${message.sender.profile.nickname} profile picture`"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserMessage } from "./types";

const { message, isMyMessage } = defineProps<{
  message: UserMessage;
  isMyMessage: boolean;
}>();
</script>
