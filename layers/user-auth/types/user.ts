import type { InferInput } from "valibot";
import type UserSchema from "$/user-auth/utils/valibot-user-schema";

export type User = InferInput<typeof UserSchema>;