import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import EventsView from "@/views/EventsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import loginView from "@/views/LoginView.vue";
import registrationView from "@/views/RegistrationView.vue";
import EventView from "@/views/EventView.vue";

const routes = [
  {
    path: "/registration",
    name: "registration",
    component: registrationView,
  },
  {
    path: "/login",
    name: "login",
    component: loginView,
  },
  {
    path: "/",
    name: "about",
    component: AboutView,
  },
  {
    path: "/events",
    name: "events",
    component: EventsView,
  },
  {
    path: "/events/:id",
    name: "post",
    component: EventView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
