import type { LobbySettings } from "@/module/game-lobbies/types";
import type { User } from "@/module/global-chat/types";
import { useLobbiesStore } from "@/stores/lobbies.store";
import { useNotificationStore } from "@/stores/notification.store";
import { useUserStore } from "@/stores/user.store";
import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useGameLobbiesStore = defineStore("game-lobbies", () => {
  const socket = io(import.meta.env.VITE_SOCKET_SERVER_ADDRESS + "/lobbies", {
    withCredentials: true,
  });

  const isCreatingLobby = ref(false);
  const currentLobbyId = ref<string | null>();

  const notificationStore = useNotificationStore();
  const lobbiesStore = useLobbiesStore();
  const userStore = useUserStore();
  const router = useRouter();

  function leaveLobby() {
    socket.emit("leaveLobby", currentLobbyId.value);
  }

  function joinLobby(lobbyId: string, cellIndex: number = -1) {
    socket.emit("joinLobby", lobbyId, cellIndex);
  }

  function createGame(lobbyId: string) {
    socket.emit("createGame", userStore.accname, lobbyId);
  }

  function createLobby(lobbySettings: LobbySettings) {
    socket.emit("createLobby", lobbySettings);
  }

  function toggleIsCreatingLobby() {
    isCreatingLobby.value= !isCreatingLobby.value;
  }

  const lobbies = computed(() => lobbiesStore.lobbies);

  socket.on("sendNotification", notificationStore.addNotificationInQueue);
  socket.on("restoreLobbies", lobbiesStore.restoreLobbies);
  socket.on("lobbyCreated", lobbiesStore.addLobby);
  socket.on("addedUser", (user: User, lobbyId: string) => {
    lobbiesStore.addUserInLobby(user, lobbyId);
    if (user.accname === userStore.accname) {
      currentLobbyId.value = lobbyId;
    }
  });
  socket.on("removeUser", (accname: string, lobbyId: string) => {
    lobbiesStore.removeUser(accname, lobbyId);
    if (accname === userStore.accname) {
      currentLobbyId.value = null;
    }
  });
  socket.on("updateLobbyAdmin", lobbiesStore.updateLobbyAdmin);
  socket.on("deleteLobby", lobbiesStore.deleteLobby);
  socket.on("startGame", (gameId: string) => {
    userStore.currentGameId = gameId;
    const path = `/game/${gameId}`;
    router
      .replace({ path })
      .then(() => console.log(`Successfully navigate to ${path}`))
      .catch(console.error);
  });

  return {
    joinLobby,
    leaveLobby,
    createGame,
    createLobby,
    toggleIsCreatingLobby,
    currentLobbyId,
    isCreatingLobby,
    lobbies,
  };
});
