import type { Enemy, Self } from "@/module/card-game/types";
import type { DeskSlot } from "@/module/card-game/types/DeskSlot";
import type { Card } from "@/module/card-game/types/Card";
import type { LobbySettings } from "@/module/game-lobbies/types";

export type GameState = {
  self: Self;
  enemies: Enemy[];
  deskSlots: DeskSlot[];
  trumpCard?: Card;
  allowedPlayerId?: string;
  isDiscardEmpty: boolean;
  isTalonEmpty: boolean;
  isTalonHasOneCard: boolean;
  isDefenderGaveUp: boolean;
  playersCount: number;
  roundNumber: number;
  settings?: LobbySettings
}