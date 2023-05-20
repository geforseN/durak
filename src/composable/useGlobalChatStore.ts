import type { UserMessage } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";
import assertInputLength from "@/utils/assert-input-length";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import formatTime from "@/utils/intl/format-time";
import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref, type Ref } from "vue";

const useGlobalChatStore = defineStore("global chat", () => {
  const socket = io(
    import.meta.env.VITE_SOCKET_SERVER_ADDRESS + "/global-chat",
    {
      withCredentials: true,
    },
  );
  const messages = ref<UserMessage[]>([]);
  const isMessagesLoaded = ref(false);
  const notificationStore = useNotificationStore();

  function sendMessage(input: Ref<string>) {
    try {
      assertInputLength(input.value);
      socket.emit("sendMessage", input.value);
      input.value = "";
    } catch (error) {
      if (!(error instanceof Error)) return console.error(error);
      notificationStore.addNotificationInQueue(
        generateNotificationFromError(error),
      );
    }
  }

  socket.on("restoreHistory", (globalChatHistory: UserMessage[]) => {
    isMessagesLoaded.value = true;
    messages.value = getFormattedMessages(globalChatHistory);
  });

  socket.on("sendMessage", (message: UserMessage) => {
    formatDateToTime(message);
    messages.value.push(message);
  });

  socket.on("sendNotification", notificationStore.addNotificationInQueue);

  function openSocket() {
    socket.open();
  }

  function closeSocket() {
    socket.close();
    isMessagesLoaded.value = false;
  }

  return {
    sendMessage,
    messages,
    isMessagesLoaded,
    openSocket,
    closeSocket,
  };
});

export { useGlobalChatStore };

function getFormattedMessages(unformattedMessages: UserMessage[]) {
  return unformattedMessages.map((message) => {
    formatDateToTime(message);
    return message;
  });
}

function formatDateToTime(message: UserMessage) {
  if (typeof message.date === "number") {
    message.date = formatTime(message.date);
  }
}
