import { forEnv } from "@/utils/env";

export const __baseURL = forEnv(import.meta.env)
  .require("VITE_SERVER_REST_BASE")
  .value();

export function withBaseUrl(string: string) {
  return __baseURL + string;
}
