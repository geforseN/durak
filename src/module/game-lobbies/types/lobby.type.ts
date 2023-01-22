import type { User } from "@/module/global-chat/types";
import type { LobbySettings } from "@/module/game-lobbies/types/lobby-settings.type";

export type Lobby = {
  id: string;
  users: User[];
  settings: LobbySettings;
  adminAccName: string;
};
