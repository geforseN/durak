import { CustomWebsocketEvent } from "@/api/websocket";
import type { LobbySettings } from "../types";

export class RemoveLobbyEvent extends CustomWebsocketEvent {
  constructor(public lobbyId: string) {
    super("lobby::remove");
  }
}

export class LeaveLobbyEvent extends CustomWebsocketEvent {
  eventName = "lobby::user::leave";
  // lobbyId can be optional, server can find lobbyId of user
  constructor(public lobbyId?: string) {
    super("lobby::user::leave");
  }
}

export class JoinLobbyEvent extends CustomWebsocketEvent {
  // slotIndex can be optional, server will make it -1 anyway
  constructor(public lobbyId: string, public slotIndex: number = -1) {
    super("lobby::user::join");
  }
}

export class LobbyUpgradeEvent extends CustomWebsocketEvent {
  // lobbyId can be optional, server can find lobbyId of user
  constructor(public lobbyId?: string) {
    super("lobby::upgrade");
  }
}

export class CreateLobbyEvent extends CustomWebsocketEvent {
  constructor(public settings: LobbySettings) {
    super("lobby::add");
  }
}
