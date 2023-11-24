import {
  boolean,
  email,
  nullish,
  number,
  object,
  string,
  uuid,
  enumType,
  parse,
  nullable,
  type Input,
} from "valibot";

export const REST_BASE = import.meta.env.VITE_SERVER_REST_BASE;

export const CREATE_ANON_USER_URL = import.meta.env.VITE_SERVER_ANON_AUTH_ROUTE;

const UserSchema = object({
  id: string([uuid()]),
  profile: object({
    connectStatus: enumType(["OFFLINE", "ONLINE", "AWAY"]),
    nickname: string(),
    personalLink: string(/* cuid */),
    photoUrl: string(),
    updatedAt: string(),
    userId: string([uuid()]),
  }),
  createdAt: string(),
  currentGameId: nullish(string([uuid()])),
  currentLobbyId: nullish(string([uuid()])),
  email: nullable(string([email()])),
  num: number(),
  updatedAt: string(),
  isAnonymous: boolean(),
});
export type User = Input<typeof UserSchema>;

export async function getMe() {
  const response = await fetch(`/api/me`, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await response.json();
  return parse(UserSchema, json);
}

// TODO: add type
export async function getProfileByLink(
  personalLink: string,
  { controller }: { controller: AbortController },
) {
  const response = await fetch(`/api/profiles/${personalLink}`, {
    signal: controller.signal,
  });
  return response.json();
}

// TODO
export async function getDurakGames() {}


export function createUser() {
  return fetch(CREATE_ANON_USER_URL, {
    method: "POST",
    credentials: "same-origin",
  });
}