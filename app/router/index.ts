import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index-page.vue";

// TODO
// https://habr.com/ru/company/ru_mts/blog/645439/
// https://webliberty.ru/oauth/
// https://habr.com/ru/post/491116/
// https://github.com/TomDoesTech/Google-OAuth-NodeJS

const routes = [
  {
    path: "/",
    name: "home",
    component: Index,
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
];

export const router = createRouter({
  history: createWebHistory(),
  strict: false,
  routes,
});

export default router;
