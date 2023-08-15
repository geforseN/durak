import type { LobbyUser } from "@/module/global-chat/types";
import type { LobbySettings } from "@/module/game-lobbies/types/lobby-settings.type";

export type Lobby = {
  id: string;
  slots: (LobbyUser | null)[];
  settings: LobbySettings;
};
