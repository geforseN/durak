import type {
  CardCount,
  GameType,
  MaxUserCount,
} from "@/module/game-lobbies/types/__config__.type";

export type LobbySettings = {
  userCount: MaxUserCount;
  gameType: GameType;
  cardCount: CardCount;
  moveTime: number;
};
