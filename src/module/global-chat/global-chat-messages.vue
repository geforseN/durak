<template>
  <section class="bg-blue-500 flex-1 overflow-y-scroll">
    <global-chat-user-message v-for="message of messages" :message="message" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { globalChat } from "@/socket";
import GlobalChatUserMessage from "../global-chat/global-chat-user-message.vue";
import type { UserMessage } from "@/module/global-chat/types";
import formatTime from "@/utils/intl/format-time";

const messages = ref<UserMessage[]>([]);

globalChat.on("server:sendMessage", (message: UserMessage) => {
  message.date = formatTime(message.date as number);
  messages.value.push(message);
});

globalChat.on("server:restoreHistory", (globalChatHistory: UserMessage[]) => {
  messages.value = globalChatHistory.reduce((chat, message) => {
    message.date = formatTime(message.date as number);
    chat.push(message);
    return chat;
  }, [] as UserMessage[]);
});
</script>
