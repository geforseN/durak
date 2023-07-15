import type { ConnectStatus } from "./index";

export type User = {
  id: string;
  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: ConnectStatus;
  User: { currentGameId: string | null }
  isAdmin: boolean
};
