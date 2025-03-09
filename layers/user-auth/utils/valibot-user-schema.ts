import * as v from "valibot";
import EmailSchema from "@/utils/valibot/email";
import UuidSchema from "@/utils/valibot/uuid";

const UserSchema = v.object({
  id: UuidSchema,
  profile: v.object({
    connectStatus: v.picklist(["OFFLINE", "ONLINE", "AWAY"]),
    nickname: v.string(),
    personalLink: v.string(/* cuid */),
    photoUrl: v.string(),
    updatedAt: v.string(),
    userId: UuidSchema,
  }),
  createdAt: v.string(),
  currentGameId: v.nullish(UuidSchema),
  currentLobbyId: v.nullish(UuidSchema),
  email: v.nullish(EmailSchema),
  num: v.number(),
  updatedAt: v.string(),
  isAnonymous: v.boolean(),
});

export default UserSchema;
