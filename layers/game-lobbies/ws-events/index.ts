import type { InitialGameSettings } from "@durak-game/durak-dts";

import { CustomWebsocketEvent } from "@/utils/api/websocket";

export class LeaveLobbyEvent extends CustomWebsocketEvent {
  eventName = "lobby::user::leave";
  // NOTE: lobbyId MAY be optional, server MUST find user lobby id
  constructor(public lobbyId?: string) {
    super("lobby::user::leave");
  }
}

export class JoinLobbyEvent extends CustomWebsocketEvent {
  // NOTE: slotIndex MAY be optional, server MUST make it -1 IF was omitted
  constructor(
    public lobbyId: string,
    public slotIndex: number = -1,
  ) {
    super("lobby::user::join");
  }
}

export class LobbyUpgradeEvent extends CustomWebsocketEvent {
  // NOTE: lobbyId MAY be optional, server MUST find user lobby id
  constructor(public lobbyId?: string) {
    super("lobby::upgrade");
  }
}

export class CreateLobbyEvent extends CustomWebsocketEvent {
  constructor(public settings: InitialGameSettings) {
    super("lobby::add");
  }
}
