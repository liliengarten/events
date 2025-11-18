import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(router).mount("#app");

export const baseUrl = `http://ykefkfi-m4.wsr.ru/api-travel`;
export const imageUrl = "http://ykefkfi-m4.wsr.ru";

export const api = async (url, options = {}) => {
  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
      ...options.headers,
    },
  });
  const { data } = await response.json();
  return data;
};
export const checkAuthorization = () => {
  if (!localStorage.getItem("userToken")) router.push("/login");
  return;
};
