import { WS_BASE, dispatchMessage } from "@/api/websocket";
import type { LobbySettings } from "@/module/game-lobbies/types";
import {
  CreateLobbyEvent,
  JoinLobbyEvent,
  LeaveLobbyEvent,
  LobbyUpgradeEvent,
  RemoveLobbyEvent,
} from "@/module/game-lobbies/ws-events";
import { useLobbiesStore } from "@/stores/lobbies.store";
import { useNotificationStore } from "@/stores/notification.store";
import { useUserStore } from "@/stores/user.store";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useGameLobbiesStore = defineStore("game-lobbies", () => {
  const notificationStore = useNotificationStore();
  const lobbiesStore = useLobbiesStore();
  const userStore = useUserStore();

  const listeners: Record<string, Function> = {
    "notification::push": notificationStore.addNotificationInQueue,
    "lobbies::restore": lobbiesStore.restoreState,
    "lobby::add": lobbiesStore.addLobby,
    "lobby::user::move": lobbiesStore.moveUser,
    "lobby::user::join": lobbiesStore.addUserInLobby,
    "lobby::user::leave": lobbiesStore.removeUser,
    "lobby::admin::update": lobbiesStore.updateLobbyAdmin,
    "lobby::remove": lobbiesStore.deleteLobby,
    "lobby::upgrade": userStore.goToGame,
  };

  function onConnected(websocket: WebSocket) {
    websocket.addEventListener(
      "message",
      dispatchMessage.bind(websocket, listeners, (error) => {
        console.log("useGameLobbiesStore useGameLobbiesStore");
        notificationStore.addNotificationInQueue({
          message:
            "useGameLobbiesStore: " +
            (error instanceof Error ? error.message : "Unknown error"),
        });
      }),
    );
  }

  const ws = useWebSocket(`${WS_BASE}/game-lobbies`, { onConnected });

  return {
    createLobby(settings: LobbySettings) {
      ws.send(new CreateLobbyEvent(settings).asString());
    },
    removeLobby(lobbyId: string) {
      ws.send(new RemoveLobbyEvent(lobbyId).asString());
    },
    joinLobby(lobbyId: string, slotIndex: number = -1) {
      ws.send(new JoinLobbyEvent(lobbyId, slotIndex).asString());
    },
    leaveLobby(lobbyId?: string) {
      ws.send(new LeaveLobbyEvent(lobbyId).asString());
    },
    createGame(lobbyId?: string) {
      ws.send(new LobbyUpgradeEvent(lobbyId).asString());
    },
    lobbies: computed(() => lobbiesStore.lobbies),
  };
});
