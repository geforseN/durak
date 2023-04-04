import type { Card } from "@/module/card-game/types/Card";

export type UserInfo = {
  accname: string
  nickname: string
  photoUrl: string | null
  personalLink: string | null
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE"
};

export type UIStatus = "revealed" | "hidden" | "freeze";
export type PlayerRole = "Defender" | "Attacker" | "Player";

export type Self = {
  cards: Card[];
  info: UserInfo;
  role: PlayerRole;
}

export type Enemy = {
  cardCount: number;
  info: UserInfo;
  role: PlayerRole;
}