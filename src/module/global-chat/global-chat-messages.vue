<template>
  <section class="flex-1 overflow-y-scroll" ref="messagesWrapper">
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
const messagesWrapper = ref<HTMLElement>()

const scrollToLastElement = (element: HTMLElement) => queueMicrotask(
  () => element.scrollTo({ behavior: "smooth", top: element.scrollHeight })
);

globalChat.on("sendMessage", (message: UserMessage) => {
  message.date = formatTime(message.date as number);
  messages.value.push(message);
  if (!messagesWrapper.value) return;
  scrollToLastElement(messagesWrapper.value);
});


globalChat.on("restoreHistory", (globalChatHistory: UserMessage[]) => {
  messages.value = globalChatHistory.map((message) => {
    if (typeof message.date === "number") {
      message.date = formatTime(message.date);
    }
    return message;
  });
  if (!messagesWrapper.value) return;
  scrollToLastElement(messagesWrapper.value);
});
</script>
