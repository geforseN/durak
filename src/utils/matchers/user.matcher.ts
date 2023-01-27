import type { User } from "@/module/global-chat/types";

export default function userMatcher(this: { accname: string }, user: User) {
  return user.accname === this.accname;
}