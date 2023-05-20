import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "@/socket";
import { type User, ConnectStatus } from "@/module/global-chat/types";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import { useNotificationStore } from "@/stores/notification.store";

type UserA = Omit<User, "id" | "isInvisible">

export const useUserStore = defineStore("user", () => {
  const { addNotificationInQueue } = useNotificationStore();

  const accname = ref("");
  const username = ref("");
  const photoUrl = ref("");
  const connectStatus = ref<ConnectStatus>(ConnectStatus.offline);
  const personalLink = ref("");
  const currentGameId = ref<string | undefined>();

  socket.on("connect_error", (error) => {
    const notification = generateNotificationFromError(error);
    addNotificationInQueue(notification);
  });

  socket.on("authenticationSuccess", (user: UserA) => {
    username.value = user.nickname;
    accname.value = user.accname;
    photoUrl.value = user.photoUrl;
    connectStatus.value = user.connectStatus;
    personalLink.value = user.personalLink;
  });

  return {
    accname,
    username,
    photoUrl,
    connectStatus,
    personalLink,
    currentGameId,
  };
});

