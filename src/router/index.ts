import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index-page.vue";
import Auth from "@/views/user-auth.vue";
const router = createRouter({
  history: createWebHistory(),
  strict: false,
  routes: [
    { path: "/", name: "home", component: Index },
    { path: "/auth", name: "Authentication", component: Auth },
    {
      path: "/profile/:id/",
      name: "user-profile",
      component: () => import("../views/user-profile.vue"),
    },
  ],
});
export default router;
