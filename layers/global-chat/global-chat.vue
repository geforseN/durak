<template>
  <div
    class="flex flex-col justify-between rounded border-4 border-primary-focus bg-secondary-focus p-1.5"
  >
    <global-chat-messages />
    <div class="mt-2 flex items-stretch gap-0.5">
      <div class="relative flex-1">
        <label
          class="sr-only"
          for="global-chat-input"
        >
          Ввод сообщения для глобального чата
        </label>
        <input
          id="global-chat-input"
          v-model="input"
          class="input input-bordered h-full w-full px-2"
          placeholder="Нажмите ENTER, что-бы отправить сообщение"
          @focus="mustShowInputLengthBadge = true"
          @blur="mustShowInputLengthBadge = false"
          @keyup.enter="handleMessageSend"
        >
        <div
          v-if="mustShowInputLengthBadge"
          :class="input.length > MAX_INPUT_LENGTH ? 'bg-error' : 'bg-accent'"
          class="absolute -bottom-10 right-1.5 rounded border border-neutral p-1 text-xs"
        >
          {{ input.length }} / {{ MAX_INPUT_LENGTH }}
        </div>
      </div>
      <button
        class="btn btn-sm ml-0.5 rounded border-2 border-neutral-700"
        title="Отправить сообщение в общий чат"
        @click="handleMessageSend"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import GlobalChatMessages from "./global-chat-messages.vue";

import { useGlobalChatStore } from "@/stores";

const MAX_INPUT_LENGTH = 128;

const input = ref("");
const mustShowInputLengthBadge = ref(false);

const globalChatStore = useGlobalChatStore();

const handleMessageSend = () => globalChatStore.sendMessage(input);
</script>
