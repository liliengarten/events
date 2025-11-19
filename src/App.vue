<template>
  <header class="px-5">
    <nav>
      <div v-show="isAuthorized">
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-3 align-items-center">
            <router-link to="/about">О проекте</router-link>
            <router-link to="/events">Список мероприятий</router-link>
          </div>
          <search-bar></search-bar>
          <div class="d-flex gap-3 align-items-center">
            <router-link to="/profile">Личный кабинет</router-link>
            <a href="#" @click="logout">Выйти</a>
          </div>
        </div>
      </div>
      <div v-show="!isAuthorized">
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/registration">Регистрация</router-link>
          <router-link to="/login">Авторизация</router-link>
        </div>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  transition: 0.3s;
}

nav a.router-link-exact-active {
  text-decoration: underline #a9d2da;
}

nav a:hover {
  transform: translateY(3px);
}
</style>
<script setup>
import { useRouter } from "vue-router";
import SearchBar from "@/components/SearchBar.vue";
import { useUser } from "@/store";
// import { computed } from "vue";

const { setToken, isAuthorized } = useUser();
const router = useRouter();

// const justify = computed(() => {
//   if (isAuthorized) return "justify-content-space-between";
//   return "justify-content-center";
// });

const logout = () => {
  if (localStorage.getItem("userToken")) {
    localStorage.setItem("userToken", "");
    setToken("");
    router.push("/login");
  }
};
</script>
