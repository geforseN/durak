import type { User } from "./user.type";

export type UserMessage = {
  text: string;
  date: number | string;
  sender: User;
  id: `${string}-${string}-${string}-${string}-${string}`;
  replyMessageId?: `${string}-${string}-${string}-${string}-${string}`;
};
