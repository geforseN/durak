import { expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import * as appThemeModule from "./app-theme-select.ts";
import App from "@/App.vue";
import { routes } from "@/router/index.ts";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

test("useAppTheme is called once on App mount", () => {
  const useAppTheme = vi.spyOn(appThemeModule, "useAppTheme");
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
