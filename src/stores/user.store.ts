import { defineStore } from "pinia";
import { ref } from "vue";
import socket from "@/socket";
import { type User, ConnectStatus } from "@/module/global-chat/types";
import generateNotificationFromError from "@/utils/generate-notification-from-error";
import { useNotificationStore } from "@/stores/notification.store";

type UserA = Omit<User, "id" | "isInvisible">

export const useUserStore = defineStore("user", () => {
  const { addNotificationInQueue } = useNotificationStore();

  const accName = ref("");
  const username = ref("");
  const photoUrl = ref("");
  const connectStatus = ref<ConnectStatus>(ConnectStatus.offline);
  const urlToProfile = ref("");

  socket.on("connect_error", (error) => {
    const notification = generateNotificationFromError(error);
    addNotificationInQueue(notification);
  });

  socket.on("authenticationSuccess", (user: UserA) => {
    username.value = user.nickname;
    accName.value = user.accName;
    photoUrl.value = user.photoUrl;
    connectStatus.value = user.connectStatus;
    urlToProfile.value = user.urlToProfile;
  });

  return {
    accName,
    username,
    photoUrl,
    connectStatus,
    urlToProfile,
  };
});

