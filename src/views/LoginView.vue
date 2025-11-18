<script setup>
import { api } from "@/main";
import { reactive } from "vue";
import { useUser } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const { getUser, setToken } = useUser();

const loginInfo = reactive({
  email: "",
  password: "",
});
const attemptLogin = async () => {
  try {
    const data = await api("/authorization", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    await getUser(data.user.id);
    localStorage.setItem("userToken", data.token);
    setToken(data.token);
    router.push("/about");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-full">
    <form class="modalWrapper rounded-5" @submit.prevent="attemptLogin">
      <h2>Авторизация</h2>
      <label>E-mail</label>
      <input type="text" v-model="loginInfo.email" />
      <label>Пароль</label>
      <input type="password" v-model="loginInfo.password" />
      <button class="mainB" type="submit">Войти</button>
    </form>
  </div>
</template>

<style scoped></style>
