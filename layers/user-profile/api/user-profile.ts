import AbortAddon from "wretch/addons/abort";
import wretch from "@/utils/api/wretch";
import type { UserProfile } from "@@/server/src/plugins/modules/user-profile/user-profile.auto-load";

const w = wretch.addon(AbortAddon());

export default {
  async get(
    personalLink: string,
    { controller }: { controller: AbortController },
  ) {
    return await w
      .signal(controller)
      .get(`/api/profiles/${personalLink}`)
      .json((v) => v as UserProfile);
  },
};
