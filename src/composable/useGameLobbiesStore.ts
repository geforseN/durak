import type { Lobby, LobbySettings } from "@/module/game-lobbies/types";
import type { User } from "@/module/global-chat/types";
import { useLobbiesStore } from "@/stores/lobbies.store";
import { useNotificationStore } from "@/stores/notification.store";
import { useUserStore } from "@/stores/user.store";
import { useWebSocket } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

export const useGameLobbiesStore = defineStore("game-lobbies", () => {
  const notificationStore = useNotificationStore();
  const lobbiesStore = useLobbiesStore();
  const userStore = useUserStore();

  const ws = useWebSocket(
    import.meta.env.VITE_FASTIFY_SERVER_URI.replace(/^http/, "ws") +
      "/game-lobbies",
    {
      onConnected(websocket) {
        websocket.addEventListener("message", (event: MessageEvent) => {
          const { eventName, payload } = new CorrectEventData(event.data);
          const listener = listeners[eventName];
          if (!listener) throw new Error("Unknown event");
          console.log({ eventName, payload, listener });
          try {
            listener(payload);
          } catch (error) {
            notificationStore.addNotificationInQueue({
              message: "useGameLobbiesStore",
            });
          }
        });
      },
    },
  );
  const lobbies = computed(() => lobbiesStore.lobbies);
  const listeners: Record<string, Function> = {
    "notification::push": notificationStore.addNotificationInQueue,
    "lobbies::restore": lobbiesStore.restoreState,
    "lobby::add": lobbiesStore.addLobby,
    "lobby::user::join": lobbiesStore.addUserInLobby,
    "lobby::user::leave": lobbiesStore.removeUser,
    "lobby::admin::update": lobbiesStore.updateLobbyAdmin,
    "lobby::delete": lobbiesStore.deleteLobby,
    "lobby::upgrate": userStore.goToGame,
  };

  return {
    createLobby(settings: LobbySettings) {
      ws.send(new CreateLobbyEvent(settings).toString());
    },
    removeLobby(lobbyId: string) {
      ws.send(new RemoveLobbyEvent(lobbyId).toString());
    },
    joinLobby(lobbyId: string, slotIndex: number = -1) {
      ws.send(new JoinLobbyEvent(lobbyId, slotIndex).toString());
    },
    leaveLobby(lobbyId?: string) {
      ws.send(new LeaveLobbyEvent(lobbyId).toString());
    },
    createGame(lobbyId?: string) {
      ws.send(new CreateGameEvent(lobbyId).toString());
    },
    lobbies,
  };
});

class WebsocketEvent {
  constructor(public eventName: string) {}
  toString() {
    return JSON.stringify(this);
  }
}

class LeaveLobbyEvent extends WebsocketEvent {
  eventName = "lobby::user::leave";
  // lobbyId can be optional, server can find lobbyId of user
  constructor(public lobbyId?: string) {
    super("lobby::user::leave");
  }
}

class RemoveLobbyEvent extends WebsocketEvent {
  constructor(public lobbyId: string) {
    super("lobby::remove");
  }
}

class JoinLobbyEvent extends WebsocketEvent {
  // slotIndex can be optional, server will make it -1 anyway
  constructor(public lobbyId: string, public slotIndex: number = -1) {
    super("lobby::user::join");
  }
}

class CreateGameEvent extends WebsocketEvent {
  // lobbyId can be optional, server can find lobbyId of user
  constructor(public lobbyId?: string) {
    super("game::start");
  }
}

class CreateLobbyEvent extends WebsocketEvent {
  constructor(public settings: LobbySettings) {
    super("lobby::add");
  }
}

class CorrectEventData {
  eventName: string;
  payload: Record<string, unknown>;

  constructor(data: unknown) {
    const parsedData = JSON.parse(data + "");
    assertIsObject(parsedData);
    const { eventName, payload } = parsedData;
    assertIsString(eventName);
    assertIsObject(payload);
    this.eventName = eventName;
    this.payload = payload;
  }
}

function assertIsObject(
  data: unknown,
): asserts data is Record<string, unknown> {
  if (typeof data !== "object" || data === null) {
    throw new TypeError("Not an object");
  }
}

function assertIsString(
  maybeString: string | unknown,
): asserts maybeString is string {
  if (typeof maybeString !== "string") {
    throw new TypeError("Not an string");
  }
}
