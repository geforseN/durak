import { playerKinds } from "./const";
import type { PlayerKind } from "./types";

export function isPlayerKind(kind: string | PlayerKind): kind is PlayerKind {
  return playerKinds.includes(kind as PlayerKind);
}


