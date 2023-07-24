import { type User } from "@/module/global-chat/types";
import { useNotificationStore } from "@/stores/notification.store";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const notificationStore = useNotificationStore();
  const router = useRouter();
  const user = reactive<
    Partial<
      User & {
        currentLobbyId: string | null;
        currentGameId: string | null;
        isCreatingLobby: boolean;
      }
    >
  >({isCreatingLobby: false});

  const ws = new WebSocket("ws://localhost:3000/");

  ws.onmessage = function (event) {
    console.log("new message: ", event.data);
    const userPayload = <Record<string, any>>JSON.parse(event.data);
    user.id = userPayload.id;
    user.nickname = userPayload.nickname;
    user.photoUrl = userPayload.photoUrl;
    user.connectStatus = userPayload.connectStatus;
    user.personalLink = userPayload.personalLink;
  };

  ws.onerror = function (event) {
    console.log("error: ", event);
    notificationStore.addNotificationInQueue({
      message: "Не удалось установить соединение.",
      type: "Error",
    });
  };

  const goToGame = ({ gameId }: { gameId: string }) => {
    const path = `/game/${gameId}`;
    router
      .replace({ path })
      .then(() => {
        user.currentLobbyId = null;
        user.currentGameId = gameId;
        console.log(`Successfully navigate to ${path}`);
      })
      .catch(console.error);
  };

  return { user, goToGame };
});
