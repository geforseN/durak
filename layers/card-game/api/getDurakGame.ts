import { REST_BASE } from "@/api/rest";

export async function getDurakGame(gameId: string) {
  const response = await fetch(`${REST_BASE}/api/durak/games/${gameId}`, {
    credentials: "include",
  });
  // TODO: throw if
  // no such game
  if (!response.ok) {
    throw new Error("Durak response not ok");
  }
  const json = await response.json();
  // TODO: parse with zod
  return {
    state: json.state
  }
}