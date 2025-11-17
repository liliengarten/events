<template>
  <header>
    <nav>
      <router-link to="/about">О проекте</router-link>
      <router-link to="/events">Список мероприятий</router-link>
      <a href="#" @click="logout">Выйти</a>
    </nav>
  </header>
  <router-view />
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
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  if (localStorage.getItem("userToken")) {
    localStorage.setItem("userToken", "");
    router.push("/");
  }
};
</script>
