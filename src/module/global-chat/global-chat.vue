<template>
  <div class="flex flex-col justify-between border-primary-focus border-4 p-1.5 bg-secondary-focus rounded">
    <global-chat-messages />
    <div class="mt-2 flex items-stretch gap-0.5">
      <div class="flex-1">
        <label class="sr-only" for="global-chat-input">Ввод сообщения для глобального чата</label>
        <input
          class="input px-2 w-full h-full input-bordered" id="global-chat-input" v-model="input"
          placeholder="Нажмите ENTER, что-бы отправить сообщение в чат." @keyup.enter="handleMessage" />
      </div>
      <button
        class="ml-0.5 btn btn-sm rounded border-2 border-neutral-700" title="Отправить сообщение в общий чат"
        @click="handleMessage">
        Оправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { globalChat } from "@/socket";
import { useNotificationStore } from "@/stores/notification.store";
import GlobalChatMessages from "@/module/global-chat/global-chat-messages.vue";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import assertInputLength from "@/utils/assert-input-length";

const input = ref("");
const { addNotificationInQueue } = useNotificationStore();

const handleMessage = () => {
  try {
    assertInputLength(input.value);
    globalChat.emit("sendMessage", input.value);
    input.value = "";
  } catch (error) {
    if (!(error instanceof Error)) return console.error(error);
    addNotificationInQueue(generateNotificationFromError(error));
  }
};
</script>
