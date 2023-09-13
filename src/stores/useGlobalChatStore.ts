import { dispatchMessage, WS_BASE } from "@/api/websocket";
import type { UserMessage } from "@/module/global-chat/types";
import { ChatMessage } from "@/module/global-chat/ws-events";
import { useNotificationStore } from "@/stores/notification.store";
import formatTime from "@/utils/intl/format-time";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useGlobalChatStore = defineStore("global-chat", () => {
  const messages = ref<UserMessage[]>([]);
  const isMessagesLoaded = ref(false);
  const notificationStore = useNotificationStore();

  const listeners: Record<string, Function> = {
    "chat::restore": ({ cache }: { cache: UserMessage[] }) => {
      cache.forEach(
        (message) => (message.formattedDate = formatTime(message.date)),
      );
      messages.value = cache;
      isMessagesLoaded.value = true;
    },
    "message::send": ({ message }: { message: UserMessage }) => {
      message.formattedDate = formatTime(message.date);
      messages.value.push(message);
    },
    "notification::push": notificationStore.addNotificationInQueue,
  };

  function onConnected(websocket: WebSocket) {
    websocket.addEventListener(
      "message",
      dispatchMessage.bind(websocket, listeners, (error) => {
        console.log(error);
      }),
    );
  }

  const websocket = useWebSocket(`${WS_BASE}/global-chat`, { onConnected });

  return {
    sendMessage(input: Ref<string>) {
      try {
        websocket.send(new ChatMessage(input).asString());
        input.value = "";
      } catch (error) {
        if (!(error instanceof Error)) {
          return console.error(error);
        }
        notificationStore.addNotificationInQueue(error);
      }
    },
    messages,
    isMessagesLoaded,
    websocket,
  };
});
