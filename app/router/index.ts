import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Index from "@/pages/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Index,
  },
  {
    path: "/profile/:personalLink/",
    name: "user-profile",
    component: () => import("@/pages/profile/[personalLink].vue"),
  },
  {
    path: "/games/:gameId/",
    name: "durak-game",
    component: () => import("@/pages/games/[gameId].vue"),
    meta: {
      layout: "",
    },
  },
] satisfies RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  strict: false,
  routes,
});

export default router;
