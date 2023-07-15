import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { type User } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";

export const useUserStore = defineStore("user", () => {
  const { addNotificationInQueue } = useNotificationStore();

  const currentGameId = ref<string | undefined>();
  const user = reactive<Partial<User>>({});

  const ws = new WebSocket("ws://localhost:3000/");

  ws.onmessage = function(event) {
    console.log("new message: ", event.data);
    setUser(JSON.parse(event.data));
  };

  ws.onerror = function(event) {
    console.log("error: ", event);
    addNotificationInQueue({ message: "Не удалось получить Ваши данные.", type: "Error" });
  };

  function setUser(userPayload: User) {
    user.id = userPayload.id;
    user.nickname = userPayload.nickname;
    user.photoUrl = userPayload.photoUrl;
    user.connectStatus = userPayload.connectStatus;
    user.personalLink = userPayload.personalLink;
  }

  return { currentGameId, user };
});

