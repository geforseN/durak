import { defineConfig, mergeConfig, defaultExclude } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        include: ["**/*.spec.ts"],
        exclude: defaultExclude.concat(
          "./server",
          "**/*.e2e.spec.ts",
          "./e2e/__snapshots__",
        ),
        environment: "jsdom",
      },
    }),
  ),
);
