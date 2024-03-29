import { useWebSocket } from "@vueuse/core";
import type { InitialGameSettings } from "@durak-game/durak-dts";

import { WS_BASE, dispatchMessage } from "@/api/websocket";
import {
  CreateLobbyEvent,
  JoinLobbyEvent,
  LeaveLobbyEvent,
  LobbyUpgradeEvent,
} from "../ws-events";

export const useLobbiesWebSocket = (
  listeners: Record<string, Function>,
  onError: (error: unknown) => void = () => {},
) => {
  const ws = useWebSocket(`${WS_BASE}/game-lobbies`, {
    onConnected(websocket) {
      websocket.addEventListener("message", (event) => {
        dispatchMessage.call(websocket, listeners, onError, event);
      });
    },
  });

  return {
    emits: {
      createLobby(settings: InitialGameSettings) {
        ws.send(new CreateLobbyEvent(settings).asString());
      },
      joinLobby(lobbyId: string, slotIndex: number = -1) {
        ws.send(new JoinLobbyEvent(lobbyId, slotIndex).asString());
      },
      leaveLobby(lobbyId?: string) {
        ws.send(new LeaveLobbyEvent(lobbyId).asString());
      },
      startGame(lobbyId?: string) {
        ws.send(new LobbyUpgradeEvent(lobbyId).asString());
      },
    },
  };
};
