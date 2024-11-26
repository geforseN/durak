type SenderProfile = {
  userId: string;
  nickname: string;
  personalLink: string;
  photoUrl: string;
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE";
};

type Sender = {
  createdAt: string;
  currentGameId: string | null;
  email: string | null;
  id: string;
  isAnonymous: boolean;
  num: number;
  profile: SenderProfile;
  updatedAt: string;
};

export type UserMessage = {
  text: string;
  date: number;
  formattedDate: string;
  sender: Sender;
  id: `${string}-${string}-${string}-${string}-${string}`;
  replyMessageId?: `${string}-${string}-${string}-${string}-${string}`;
};
