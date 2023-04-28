import type { Enemy, Self } from "@/module/card-game/types";
import type { DeskSlot } from "@/module/card-game/types/DeskSlot";
import type { Card } from "@/module/card-game/types/Card";

export type GameState = {
  self: Self,
  enemies: Enemy[],
  deskSlots: DeskSlot[],
  trumpCard: Card,
  allowedPlayerId: string,
}