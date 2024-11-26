import type { LobbyDTO, LobbyUserDTO } from "../types";
import type { GameSettings } from "@durak-game/durak-dts";

export function createLobby(lobby: LobbyDTO) {
  return new Lobby(lobby.id, lobby.slots, lobby.settings);
}

export interface ILobby extends LobbyDTO {
  get users(): LobbyUserDTO[];

  get isFull(): boolean;

  hasUserWithId(userId: string): boolean;

  hasAdminWithId(userId: string): boolean;

  removeUserWithId(userId: string): void;

  putUserByIndex(user: LobbyUserDTO, index: number): void;

  tryUpdateAdminById(newAdminId: string): void;
}

export class Lobby implements ILobby {
  constructor(
    public readonly id: string,
    public readonly slots: (LobbyUserDTO | null)[],
    public readonly settings: GameSettings,
  ) {}

  get users() {
    return this.slots.filter((slot): slot is LobbyUserDTO => !!slot);
  }

  get isFull() {
    return this.users.length === this.settings.players.count;
  }

  hasUserWithId(userId: string) {
    return this.users.some((user) => user.id === userId);
  }

  hasAdminWithId(userId: string) {
    return this.users.some((user) => user.id === userId && user.isAdmin);
  }

  removeUserWithId(userId: string) {
    const index = this.slots.findIndex((slot) => slot?.id === userId);
    if (index === -1) {
      throw new Error("User not found, server send wrong data");
    }
    this.slots[index] = null;
  }

  putUserByIndex(user: LobbyUserDTO, index: number) {
    this.slots[index] = user;
  }

  tryUpdateAdminById(newAdminId: string) {
    const pastAdmin = this.users.find((user) => user.isAdmin);
    const newAdmin = this.slots.find((slot) => slot?.id === newAdminId);
    if (!newAdmin) {
      throw new Error("User not found, server send wrong data");
    }
    if (pastAdmin) {
      pastAdmin.isAdmin = false;
    }
    newAdmin.isAdmin = true;
  }
}
