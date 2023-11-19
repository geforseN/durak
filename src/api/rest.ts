import { boolean, object, optional, parse, string, uuid } from "valibot";

export const REST_BASE = import.meta.env.VITE_SERVER_REST_BASE;

export const CREATE_ANON_USER_URL = import.meta.env.VITE_SERVER_ANON_AUTH_ROUTE;

const _UserSchema = object({
  id: string([uuid()]),
  profile: object({}),
  isAnonymous: boolean(),

  currentGameId: optional(string([uuid()])),
  currentLobbyId: optional(string([uuid()])),
});

export async function getMe() {
  const response = await fetch(`api/me`, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

// TODO
export async function getDurakGames() {}
