import type { LobbyUser } from "@/module/global-chat/types";
import type {GameSettings} from '@durak-game/durak-dts'

export type Lobby = {
  id: string;
  slots: (LobbyUser | null)[];
  settings: GameSettings;
};
