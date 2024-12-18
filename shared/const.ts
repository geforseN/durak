import type { InitialGameSettings, Rank } from "./types";

export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
] as const;

export const suits = ["♠", "♦", "♥", "♣"] as const;

export const powers: Record<Rank, number> = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  "10": 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
} as const;

export const defaultInitialGameSettings: InitialGameSettings = {
  playerCount: 2,
  talonCardCount: 36,
  gameType: "basic",
  moveTime: 30_000,
} as const;

export const allowedPlayerKinds = ["AllowedAttacker", "AllowedDefender"] as const;

export const playerKinds = [
  "Attacker",
  "Defender",
  "Player",
  ...allowedPlayerKinds,
  "SurrenderedDefender",
] as const;

export const allowedDurakGameTypes = ["basic", "perevodnoy"] as const;

export const allowedTalonCardCount = [24, 36, 52] as const;

export const allowedPlayerCount = [2, 3, 4, 5, 6] as const;

export const allowedMissingCardCount = [0, 1, 2, 3, 4, 5, 6] as const;
