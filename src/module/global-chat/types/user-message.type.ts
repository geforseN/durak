export enum ConnectStatus {
  "online",
  "away",
  "offline",
};

export type User = {
  id?: string | number;
  nickname: string;
  accName: string;
  urlToProfile?: string;
  photoUrl: string;
  connectStatus: ConnectStatus;
  isInvisible?: boolean;
};

export type UserMessage = {
  text: string;
  date: number | string;
  sender: User;
  urlToProfile: string;
};
