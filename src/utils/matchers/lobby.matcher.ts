import type { Lobby } from "@/module/game-lobbies/types";

export default function lobbyMatcher(this: { lobbyId: string }, lobby: Lobby) {
  return lobby.id === this.lobbyId;
}