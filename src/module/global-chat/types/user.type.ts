import type { ConnectStatus } from "./connect-status.enum";

export type User = {
  accName: string;

  nickname: string;
  urlToProfile: string;
  photoUrl: string;
  connectStatus: ConnectStatus;

  id?: string | number;
  isInvisible?: boolean;
};
