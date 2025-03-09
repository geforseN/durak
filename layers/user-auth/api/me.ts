import * as v from "valibot";
import wretch from "@/utils/api/wretch";
import UserSchema from "$/user-auth/utils/valibot-user-schema";

export type User = v.InferInput<typeof UserSchema>;

const parseUser = (user: unknown) => v.parse(UserSchema, user);

const w = wretch
  .options({
    credentials: "include",
    mode: "cors",
  })
  .get(`/api/me`);

export default {
  async get() {
    return await w.json(parseUser);
  },
};
