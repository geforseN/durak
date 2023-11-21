import type { LobbyUser } from "@/module/global-chat/types";
import type { GameSettings } from "@durak-game/durak-dts";

export function createLobby(lobby: Lobby) {
  return new Lobby(lobby.id, lobby.slots, lobby.settings);
}

export interface ILobby {
  id: string;
  slots: (LobbyUser | null)[];
  settings: GameSettings;

  get users(): LobbyUser[];

  get isFull(): boolean;

  hasUserWithId(userId: string): boolean;

  hasAdminWithId(userId: string): boolean;

  removeUserWithId(userId: string): void;

  putUserByIndex(user: LobbyUser, index: number): void;

  tryUpdateAdminById(newAdminId: string): void;
}

export class Lobby implements ILobby {
  constructor(
    public readonly id: string,
    public readonly slots: (LobbyUser | null)[],
    public readonly settings: GameSettings,
  ) {}

  get users() {
    return this.slots.filter((slot): slot is LobbyUser => !!slot);
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
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    const index = this.slots.indexOf(user);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.slots[index] = null;
  }

  putUserByIndex(user: LobbyUser, index: number) {
    this.slots[index] = user;
  }

  tryUpdateAdminById(newAdminId: string) {
    const pastAdmin = this.users.find((user) => user.isAdmin);
    const newAdmin = this.slots.find((slot) => slot?.id === newAdminId);
    if (!newAdmin) {
      throw new Error("Server send wrong data");
    }
    if (pastAdmin) {
      pastAdmin.isAdmin = false;
    }
    newAdmin.isAdmin = true;
  }
}
