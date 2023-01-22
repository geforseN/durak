import type { User } from "./user.type";

export type UserMessage = {
  text: string;
  date: number | string;
  sender: User;
};
