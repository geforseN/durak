<template>
  <section
    class="scrollbar flex flex-1 flex-col overflow-y-scroll rounded border-2 border-neutral/70 bg-info/70"
    ref="messagesContainer"
  >
    <global-chat-user-message
      v-for="message of globalChatStore.messages"
      :key="message.date + message.sender.accname"
      :message="message"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { whenever } from "@vueuse/core";
import { useGlobalChatStore } from "@/composable/useGlobalChatStore";
import GlobalChatUserMessage from "./global-chat-user-message.vue";

const messagesContainer = ref<HTMLElement>();
const globalChatStore = useGlobalChatStore();

onMounted(globalChatStore.openSocket);
onUnmounted(globalChatStore.closeSocket);
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

function scrollToLastElement(
  { behavior = "auto" }: Omit<ScrollOptions, "top"> = {},
) {
  return queueMicrotask(() => {
    if (!messagesContainer.value) return;
    const top = messagesContainer.value.scrollHeight;
    messagesContainer.value?.scrollTo({ behavior, top });
  });
}
</script>
