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
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("./pages/AboutView.vue"),
    // },
    {
      path: "/rooms",
      name: "roomlist",
      component: () => import("./pages/RoomList.vue"),
    },
    {
      path: "/room",
      name: "room",
      component: () => import("./pages/RoomDetail.vue"),
    },
    {
      path: "/bookings",
      name: "bookinglist",
      component: () => import("./pages/BookingList.vue"),
    },
  ],
});

export default router;