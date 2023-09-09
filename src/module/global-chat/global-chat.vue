<template>
  <div
    class="flex flex-col justify-between rounded border-4 border-primary-focus bg-secondary-focus p-1.5"
  >
    <global-chat-messages />
    <div class="mt-2 flex items-stretch gap-0.5">
      <div class="relative flex-1">
        <label class="sr-only" for="global-chat-input">
          Ввод сообщения для глобального чата
        </label>
        <input
          @focus="showTextLength = true"
          @blur="showTextLength = false"
          class="input-bordered input h-full w-full px-2"
          id="global-chat-input"
          v-model="input"
          placeholder="Нажмите ENTER, что-бы отправить сообщение"
          @keyup.enter="handleMessage"
        />
        <div
          v-if="showTextLength"
          :class="input?.length > maxInputLength && 'text-red-600'"
          class="absolute -bottom-10 right-1.5 rounded border border-neutral bg-accent p-1 text-xs"
        >
          {{ input?.length ?? 0 }} / {{ maxInputLength }}
        </div>
      </div>
      <button
        class="btn-sm btn ml-0.5 rounded border-2 border-neutral-700"
        title="Отправить сообщение в общий чат"
        @click="handleMessage"
      >
        Оправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalChatStore } from "@/composable/useGlobalChatStore";
import GlobalChatMessages from "@/module/global-chat/global-chat-messages.vue";
import { ref } from "vue";

const maxInputLength = 128;
const input = ref("");
const showTextLength = ref(false);
const globalChatStore = useGlobalChatStore();
const handleMessage = () => globalChatStore.sendMessage(input);
</script>
