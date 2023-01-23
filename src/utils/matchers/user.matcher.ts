import type { User } from "@/module/global-chat/types";

export default function userMatcher(this: { accName: string }, user: User) {
  return user.accName === this.accName;
}