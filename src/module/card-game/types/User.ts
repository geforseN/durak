import type { Card } from "@/module/card-game/types/Card";

export type User = {
  accname: string
  nickname: string
  photoUrl: string | null
  personalLink: string | null
  connectStatus: {
    ONLINE: "ONLINE",
    AWAY: "AWAY",
    OFFLINE: "OFFLINE"
  },
  role: PlayerRole
};

export type UIStatus = "revealed" | "hidden" | "freeze";
export type PlayerRole = "defender" | "attacker" | "player";

export type Self = {
  cards: Card[];
  info: User
}

export type Enemy = {
  cardCount: number;
  info: User;
}