import { createRouter, createWebHistory } from "vue-router";
import AuthorizationView from "@/views/AuthorizationView.vue";
import AboutView from "@/views/AboutView.vue";
import EventsView from "@/views/EventsView.vue";

const routes = [
  {
    path: "/",
    name: "authorization",
    component: AuthorizationView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/events",
    name: "events",
    component: EventsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
