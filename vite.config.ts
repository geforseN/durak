import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

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
      icons({
        autoInstall: true,
        defaultClass: "h-6 w-6 xs:h-8 xs:w-8",
      }),
      Components({
        resolvers: [IconsResolver()],
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
        $: fileURLToPath(new URL("./layers", import.meta.url)),
        "@@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  };
});
