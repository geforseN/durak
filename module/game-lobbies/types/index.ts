import type { GameSettings } from "@durak-game/durak-dts";

type LobbyUserProfile = {
  userId: string;
  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE";
};

export type LobbyUserDTO = {
  id: string;
  profile: LobbyUserProfile;
  isAdmin: boolean;
};

export interface LobbyDTO {
  id: string;
  slots: (LobbyUserDTO | null)[];
  settings: GameSettings;
}
