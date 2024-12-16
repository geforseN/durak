import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { defineConfig, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.spec.ts"],
    exclude: defaultExclude.concat(
      "./server",
      "**/*.e2e.spec.ts",
      "./e2e/__snapshots__",
    ),
    environment: 'jsdom',
  },
  plugins: [
    // @ts-expect-error it works :)
    vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
      $: fileURLToPath(new URL("./layers", import.meta.url)),
      "@@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
