import type { Card } from "@/module/card-game/types/Card";

export type UserInfo = {
  id: string
  isAdmin: boolean
  nickname: string
  photoUrl: string
  personalLink: string
  connectStatus: "ONLINE" | "AWAY" | "OFFLINE"
};

export type UIStatus = "revealed" | "hidden" | "freeze";
export type PlayerRole = "Defender" | "Attacker" | "Player";

export type Self = {
  cards: Card[];
  info: UserInfo;
  kind: PlayerRole;
  id: string;
}

export type Enemy = {
  cardCount: number;
  info: UserInfo;
  kind: PlayerRole;
  id: string;
}