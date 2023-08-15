import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index-page.vue";

// TODO
// https://habr.com/ru/company/ru_mts/blog/645439/
// https://webliberty.ru/oauth/
// https://habr.com/ru/post/491116/
// https://github.com/TomDoesTech/Google-OAuth-NodeJS

const router = createRouter({
  history: createWebHistory(),
  strict: false,
  routes: [
    {
      path: "/",
      name: "home",
      component: Index,
    },
    {
      path: "/auth/login",
      name: "user-login",
      component: () => import("../views/auth/user-login.vue"),
    },
    {
      path: "/auth/registration",
      name: "user-registration",
      component: () => import("../views/auth/user-registration.vue"),
    },
    {
      path: "/auth/forgot-credentials",
      name: "user-forgot-credentials",
      component: () => import("../views/auth/user-forgot-credentials.vue"),
    },
    {
      path: "/auth/yandex/redirect",
      name: "yandex-auth-redirect",
      component: () => import("../views/auth/yandex/redirect.vue"),
    },
    {
      path: "/auth/vk/redirect",
      name: "vk-auth-redirect",
      component: () => import("../views/auth/vk/redirect.vue"),
    },
    {
      path: "/auth/twitch/redirect",
      name: "twitch-auth-redirect",
      component: () => import("../views/auth/twitch/redirect.vue"),
    },
    {
      path: "/profile/:personalLink/",
      name: "user-profile",
      component: () => import("../views/user-profile.vue"),
    },
    {
      path: "/game/:gameId/",
      name: "durak-game",
      component: () => import("../views/durak-game.vue"),
      meta: {
        layout: "",
      },
    },
  ],
});
export default router;
