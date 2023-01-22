<template>
  <div
    class="w-[40rem] h-[20rem] flex flex-col justify-between border border-black p-2"
  >
    <global-chat-messages />
    <div class="mt-2 grid grid-flow-col grid-cols-[1fr_max-content]">
      <section>
        <label class="sr-only" for="global-chat-input">Введите сообщение</label>
        <input
          class="border-2 border-black border-r-0 w-full h-full"
          id="global-chat-input"
          v-model="input"
          placeholder="Нажмите ENTER, что-бы отправить сообщение в чат."
          @keyup.enter="handleMessage"
        />
      </section>
      <button
        class="bg-amber-300 focus:bg-amber-400 border-2 border-black px-2 py-[1px]"
        title="Отправить сообщение в общий чат"
        @click="handleMessage"
      >
        Оправить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { globalChat } from "@/socket";
import useNotificationStore from "@/stores/notification.store";

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
    const notification = generateNotificationFromError(error as Error);
    addNotificationInQueue(notification);
  }
};
</script>
