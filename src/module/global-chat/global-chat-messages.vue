<template>
  <section
    class="flex-1 overflow-y-scroll scrollbar bg-info/70 border-neutral/70 border-2 rounded flex flex-col"
    ref="messagesContainer">
    <global-chat-user-message
      v-for="message of messages"
      :key="message.date+message.sender.accname"
      :message="message"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { globalChat } from "@/socket";
import GlobalChatUserMessage from "../global-chat/global-chat-user-message.vue";
import type { UserMessage } from "@/module/global-chat/types";
import formatTime from "@/utils/intl/format-time";

const messages = ref<UserMessage[]>([]);
const messagesContainer = ref<HTMLElement>();

const scrollToLastElement = ({ behavior = "auto" }: Omit<ScrollOptions, "top"> = {}) => {
  return queueMicrotask(() => {
    if (!messagesContainer.value) return;
    const top = messagesContainer.value.scrollHeight;
    messagesContainer.value?.scrollTo({ behavior, top });
  });
};

const getFormattedMessages = (unformattedMessages: UserMessage[]) => {
  return unformattedMessages.map((message) => {
    if (typeof message.date === "number") {
      message.date = formatTime(message.date);
    }
    return message;
  });
};

globalChat.on("sendMessage", (message: UserMessage) => {
  message.date = formatTime(message.date as number);
  messages.value.push(message);
  scrollToLastElement({ behavior: "smooth" });
});

globalChat.on("restoreHistory", (globalChatHistory: UserMessage[]) => {
  messages.value = getFormattedMessages(globalChatHistory);
  scrollToLastElement();
});
</script>
