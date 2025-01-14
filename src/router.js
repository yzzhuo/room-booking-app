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
      path: "/rooms",
      name: "roomlist",
      component: () => import("./pages/RoomList.vue"),
    },
    {
      path: "/room/:id",
      name: "room",
      component: () => import("./pages/RoomDetail.vue"),
    },
    {
      path: "/bookings",
      name: "bookinglist",
      component: () => import("./pages/BookingList.vue"),
    },
    {
      path: "/help",
      name: "help",
      component: () => import("./pages/Help.vue"),
    },
  ],
});

export default router;