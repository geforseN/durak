import type { UserMessage } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";
import assertInputLength from "@/utils/assert-input-length";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import formatTime from "@/utils/intl/format-time";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useGlobalChatStore = defineStore("global-chat", () => {
  const websocket = useWebSocket(
    import.meta.env.VITE_FASTIFY_SERVER_URI.replace(/^http/, "ws") +
      "/global-chat",
    {
      onConnected(websocket) {
        websocket.addEventListener("message", dispatchMessage);
      },
    },
  );
  const messages = ref<UserMessage[]>([]);
  const isMessagesLoaded = ref(false);
  const notificationStore = useNotificationStore();

  function sendMessage(input: Ref<string>) {
    try {
      assertInputLength(input.value);
      websocket.send(new Message(input).toString());
      input.value = "";
    } catch (error) {
      if (!(error instanceof Error)) return console.error(error);
      notificationStore.addNotificationInQueue(
        generateNotificationFromError(error),
      );
    }
  }

  function dispatchMessage(event: MessageEvent) {
    const { eventName, payload } = JSON.parse(event.data);
    console.log("EVENT", eventName, "PAYLOAD", payload);
    const listener = listeners[eventName];
    if (!listener) throw new Error("Unknown event");
    listener(...payload);
  }

  const listeners: Record<string, Function> = {
    "chat::restore": (globalChatHistory: UserMessage[]) => {
      messages.value = getFormattedMessages(globalChatHistory);
      isMessagesLoaded.value = true;
    },
    "message::send": (message: UserMessage) => {
      formatDateToTime(message);
      messages.value.push(message);
    },
    "notification::push": notificationStore.addNotificationInQueue,
  };

  return {
    sendMessage,
    messages,
    isMessagesLoaded,
    websocket,
  };
});

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

class Message {
  text: string;
  replyMessageId?: string;

  constructor(input: Ref<string>) {
    this.text = input.value;
    this.replyMessageId = undefined;
  }

  toString() {
    return JSON.stringify({
      eventName: "message::send",
      payload: {
        text: this.text,
        replyMessageId: this.replyMessageId,
      },
    });
  }
}
