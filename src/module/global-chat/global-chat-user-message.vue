<template>
  <div class="chat" :class="isMyMessage ? 'chat-end' : 'chat-start'">
    <global-chat-user-message-avatar v-bind="{ message, isMyMessage }" />
    <global-chat-user-message-chat-bubble v-bind="{ message, isMyMessage }" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import GlobalChatUserMessageAvatar from "./global-chat-user-message-avatar.vue";
import GlobalChatUserMessageChatBubble from "./global-chat-user-message-chat-bubble.vue";

import { useUserStore } from "@/stores/user.store";

import type { UserMessage } from "./types";

const { message } = defineProps<{ message: UserMessage }>();
const userStore = useUserStore();

const isMyMessage = computed(
  () => userStore.user.state.id === message.sender.id,
);
</script>
