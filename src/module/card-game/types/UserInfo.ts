import type { Card } from "@/module/card-game/types/Card";

export type UserInfo = {
  accname: string
  nickname: string
  photoUrl: string | null
  personalLink: string | null
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE"
};

export type UIStatus = "revealed" | "hidden" | "freeze";
export type PlayerRole = "defender" | "attacker" | "player";

export type Self = {
  cards: Card[];
  info: UserInfo;
}

export type Enemy = {
  cardCount: number;
  info: UserInfo;
}