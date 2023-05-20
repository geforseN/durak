import type { CardCount, GameType, MaxUserCount } from "@/module/game-lobbies/types/__config__.type";

export type LobbySettings = {
  maxUserCount: MaxUserCount;
  gameType: GameType;
  cardCount: CardCount;
  moveTime: number;
}