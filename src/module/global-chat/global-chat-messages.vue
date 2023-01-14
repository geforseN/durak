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

globalChat.on("server:sendMessage", (messageObject: UserMessage) => {
  messageObject.date = formatTime(messageObject.date as number);
  messages.value.push(messageObject);
});

</script>
