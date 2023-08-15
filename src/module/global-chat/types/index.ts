export type UserMessage = {
  text: string;
  date: number;
  formattedDate: string;
  sender: Sender;
  id: `${string}-${string}-${string}-${string}-${string}`;
  replyMessageId?: `${string}-${string}-${string}-${string}-${string}`;
};

// TODO remove User
export type User = {
  id: string;
  userId: string;
  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE";
  currentGameId: string | null;
};

type Sender = {
  createdAt: string;
  currentGameId: string | null;
  email: string | null;
  id: string;
  isAnonymous: boolean;
  num: number;
  profile: UserProfile;
  updatedAt: string;
};

// TODO remove type to own module
export type LobbyUser = {
  id: string;
  profile: UserProfile;
  isAdmin: boolean;
};

type UserProfile = {
  userId: string;
  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE";
};
