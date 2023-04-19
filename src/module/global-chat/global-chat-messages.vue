<template>
  <section
    class="flex-1 overflow-y-scroll bg-info border-neutral border-2"
    ref="messagesWrapper">
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
const messagesWrapper = ref<HTMLElement>();

const scrollToLastElement = ({ behavior = "auto" }: Omit<ScrollOptions, "top"> = {}) => {
  return queueMicrotask(() => {
    if (!messagesWrapper.value) return;
    const top = messagesWrapper.value.scrollHeight;
    messagesWrapper.value?.scrollTo({ behavior, top })
  });
}

globalChat.on("sendMessage", (message: UserMessage) => {
  message.date = formatTime(message.date as number);
  messages.value.push(message);
  scrollToLastElement({ behavior: "smooth" });
});

globalChat.on("restoreHistory", (globalChatHistory: UserMessage[]) => {
  messages.value = globalChatHistory.map((message) => {
    if (typeof message.date === "number" && Number.isFinite(message.date)) {
      message.date = formatTime(message.date);
    }
    return message;
  });
  scrollToLastElement();
})
</script>
