<template>
  <div class="chat" :class="isMyMessage ? 'chat-end' : 'chat-start'">
    <global-chat-user-message-avatar v-bind="{ message, isMyMessage }" />
    <global-chat-user-message-chat-bubble v-bind="{ message, isMyMessage }" />
  </div>
</template>
<script setup lang="ts">
import type { UserMessage } from "@/module/global-chat/types";
import { useUserStore } from "@/stores/user.store";
import GlobalChatUserMessageChatBubble from "./global-chat-user-message-chat-bubble.vue";
import GlobalChatUserMessageAvatar from "./global-chat-user-message-avatar.vue";
import { computed } from "vue";

const { message } = defineProps<{ message: UserMessage }>();
const userStore = useUserStore();
const isMyMessage = computed(
  () => userStore.accname === message.sender.accname,
);
</script>
