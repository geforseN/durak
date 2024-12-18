import * as v from "valibot";
import type { UserProfile } from "@@/server/src/plugins/modules/user-profile/user-profile.auto-load";

export const REST_BASE = import.meta.env.VITE_SERVER_REST_BASE;

export const CREATE_ANON_USER_URL = import.meta.env.VITE_SERVER_ANON_AUTH_ROUTE;

const UserSchema = v.object({
  id: v.pipe(v.string(), v.uuid()),
  profile: v.object({
    connectStatus: v.picklist(["OFFLINE", "ONLINE", "AWAY"]),
    nickname: v.string(),
    personalLink: v.string(/* cuid */),
    photoUrl: v.string(),
    updatedAt: v.string(),
    userId: v.pipe(v.string(), v.uuid()),
  }),
  createdAt: v.string(),
  currentGameId: v.nullish(v.pipe(v.string(), v.uuid())),
  currentLobbyId: v.nullish(v.pipe(v.string(), v.uuid())),
  email: v.nullable(v.pipe(v.string(), v.email())),
  num: v.number(),
  updatedAt: v.string(),
  isAnonymous: v.boolean(),
});

export type User = v.InferInput<typeof UserSchema>;

export async function getMe() {
  const response = await fetch(`${REST_BASE}/api/me`, {
    credentials: "include",
    mode: "cors",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await response.json();
  return v.parse(UserSchema, json);
}

export async function getProfileByLink(
  personalLink: string,
  { controller }: { controller: AbortController },
) {
  const response = await fetch(`${REST_BASE}/api/profiles/${personalLink}`, {
    signal: controller.signal,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await response.json();
  return json as UserProfile;
}

// TODO
export async function getDurakGames() {}

export function createUser() {
  return fetch(CREATE_ANON_USER_URL, {
    method: "POST",
    credentials: "include",
    mode: "cors",
  });
}
