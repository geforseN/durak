import consola from "consola";
import { withBaseUrl } from "@/utils/api/rest";
import env from "@/utils/env";

const key = "VITE_SERVER_ANON_AUTH_ROUTE";

export default env(import.meta.env)
  .try(key)
  .orElse(() => {
    const defaultValue = withBaseUrl("/api/auth/login/anonymous");
    consola.warn(`Failed to find environment variable, using default value`, {
      key,
      defaultValue,
    });
    return defaultValue;
  });
