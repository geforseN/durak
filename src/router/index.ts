import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index-page.vue";

// ДЛЯ РЕГИСТРАЦИИ, ЛОГИНА, СМЕНЫ ДАННЫХ
//<!-- TODO: ширина форм меняется из-за ширины текста (h1, dt, dd) -->
//<!-- TODO: изменять url страницы, сделать три отдельных компонента формы -->

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
      path: "/profile/:urlToProfile/",
      name: "user-profile",
      component: () => import("../views/user-profile.vue"),
    },
    {
      path: "/game/:gameId/",
      name: "durak-game",
      component: () => import("../views/durak-game.vue"),
    },
  ],
});
export default router;
