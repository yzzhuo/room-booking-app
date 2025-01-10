import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./pages/AboutView.vue"),
    },
    {
      path: "/pagedetail",
      name: "pagedetail",
      component: () => import("./pages/RoomDetail.vue"),
    },
  ],
});

export default router;