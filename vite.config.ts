import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_SERVER_REST_BASE,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./app", import.meta.url)),
        "$": fileURLToPath(new URL("./layers", import.meta.url)),
      },
    },
  };
});
