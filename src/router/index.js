import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import EventsView from "@/views/EventsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import loginView from "@/views/LoginView.vue";
import registrationView from "@/views/RegistrationView.vue";
import EventView from "@/views/EventView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ForbiddenForYou from "@/views/ForbiddenForYou.vue";

const mainRedirect = () => {
  if (localStorage.getItem("userToken")) return "/about";
  return "/registration";
};

const routes = [
  {
    path: "/",
    redirect: mainRedirect(),
  },
  {
    path: "/forbidden-for-you",
    name: "forbidden-for-you",
    component: ForbiddenForYou,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "forbidden",
    component: NotFoundView,
  },
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
    path: "/about",
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
    name: "event",
    component: EventView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
