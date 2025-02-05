import { expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createApp } from "vue";
import * as useAppThemeModule from "./useAppTheme";
import App from "@/App.vue";
import router from "@/router/index.ts";

test("useAppTheme is called once on App mount", () => {
  const useAppTheme = vi.spyOn(useAppThemeModule, "useAppTheme");
  const pinia = createPinia();
  createApp(App).use(router).use(pinia);
  setActivePinia(pinia);
  mount(App, {
    global: {
      plugins: [router],
    },
  });
  expect(useAppTheme).toHaveBeenCalledOnce();
});
