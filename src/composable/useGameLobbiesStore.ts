import type { Lobby, LobbySettings } from "@/module/game-lobbies/types";
import type { User } from "@/module/global-chat/types";
import { useLobbiesStore } from "@/stores/lobbies.store";
import {
  type NotificationAlert,
  useNotificationStore,
} from "@/stores/notification.store";
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
    socket.emit("lobby::remove", { lobbyId: currentLobbyId.value });
  }

  function joinLobby(lobbyId: string, slotIndex: number = -1) {
    socket.emit("lobby::user::join", { lobbyId, slotIndex });
  }

  function createGame(lobbyId: string) {
    socket.emit("game::start", { lobbyId });
  }

  function createLobby(settings: LobbySettings) {
    socket.emit("lobby::add", { settings });
  }

  const lobbies = computed(() => lobbiesStore.lobbies);

  socket
    .on("notification::push", (notification: NotificationAlert) => {
      notificationStore.addNotificationInQueue(notification);
    })
    .on(
      "lobbies::restore",
      ({ lobbies, lobbyId }: { lobbies: Lobby[]; lobbyId: Lobby["id"] }) => {
        lobbiesStore.restoreLobbies({ lobbies, lobbyId });
      },
    )
    .on("lobby::add", ({ lobby }: { lobby: Lobby }) => {
      lobbiesStore.addLobby({ lobby });
    })
    .on(
      "lobby::user::join",
      ({
        user,
        lobbyId,
        slotIndex,
      }: {
        user: User;
        lobbyId: Lobby["id"];
        slotIndex: number;
      }) => {
        lobbiesStore.addUserInLobby({ user, lobbyId, slotIndex });
        if (user.id === userStore.user.id) {
          currentLobbyId.value = lobbyId;
        }
      },
    )
    .on(
      "lobby::user::leave",
      ({ lobbyId, userId }: { lobbyId: Lobby["id"]; userId: User["id"] }) => {
        lobbiesStore.removeUser({ userId, lobbyId });
        if (userId === userStore.user.id) {
          currentLobbyId.value = null;
        }
      },
    )
    .on(
      "lobby::admin::update",
      ({ lobbyId, adminId }: { lobbyId: Lobby["id"]; adminId: User["id"] }) => {
        lobbiesStore.updateLobbyAdmin({ lobbyId, adminId });
      },
    )
    .on("lobby::delete", ({ lobbyId }: { lobbyId: Lobby["id"] }) => {
      lobbiesStore.deleteLobby({ lobbyId });
    });
  socket.on("startGame", (gameId: string) => {
    // TODO
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
    currentLobbyId,
    isCreatingLobby,
    lobbies,
  };
});
