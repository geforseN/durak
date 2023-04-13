<template>
  <div class="flex flex-col justify-between border-primary border-4 p-1.5 pb-1 bg-secondary">
    <global-chat-messages class="bg-info border-primary border-2" />
    <div class="mt-2 flex items-stretch gap-0.5 ">
      <div class="flex-1 ">
        <label class="sr-only" for="global-chat-input">Введите сообщение</label>
        <input class="p-1 border-2 border-neutral w-full h-full" id="global-chat-input" v-model="input"
          placeholder="Нажмите ENTER, что-бы отправить сообщение в чат." @keyup.enter="handleMessage" />
      </div>
      <button class="btn btn-md h-full rounded-none border-2 border-neutral" title="Отправить сообщение в общий чат"
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
