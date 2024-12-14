<template>
  <section
    ref="messagesContainer"
    class="scrollbar flex flex-1 flex-col overflow-y-scroll rounded border-2 border-neutral/70 bg-accent/50"
  >
    <global-chat-user-message
      v-for="message of globalChatStore.messages"
      :key="message.id"
      :message="message"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { whenever } from "@vueuse/core";

import { useGlobalChatStore } from "@/stores";

import GlobalChatUserMessage from "./global-chat-user-message.vue";

const messagesContainer = ref<HTMLElement>();

const globalChatStore = useGlobalChatStore();

whenever(
  () => globalChatStore.isMessagesLoaded,
  () => {
    scrollToLastElement();
  },
);

watch(
  () => globalChatStore.messages,
  () => {
    scrollToLastElement({ behavior: "smooth" });
  },
  { deep: true },
);

function scrollToLastElement({
  behavior = "auto",
}: Omit<ScrollOptions, "top"> = {}) {
  // NOTE ? maybe can use nextTick from vue instead of queueMicrotask ?
  return queueMicrotask(() => {
    if (!messagesContainer.value) {
      return;
    }
    const top = messagesContainer.value.scrollHeight;
    if (!top) {
      return;
    }
    messagesContainer.value.scrollTo({ behavior, top });
  });
}
</script>
