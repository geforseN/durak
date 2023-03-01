import type { Enemy, Self } from "@/module/card-game/types/User";
import type { DeskSlot } from "@/module/card-game/types/DeskSlot";
import type { Card } from "@/module/card-game/types/Card";

export type GameState = {
  self: Self,
  enemies: Enemy[],
  deskSlots: DeskSlot[],
  trumpCard: Card,
  allowedPlayerAccname: string,
}