import type { Card } from "@/module/card-game/types/Card";

export type DeskSlot = {
  attackCard: Card | null,
  defendCard: Card | null,
}