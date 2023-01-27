import type { ConnectStatus } from "./connect-status.enum";

export type User = {
  accname: string;

  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: ConnectStatus;

  id?: string | number;
  isInvisible?: boolean;
};
