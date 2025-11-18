<script setup>
import { useModals, useUser } from "@/store";
import { onMounted, reactive } from "vue";
import { api, imageUrl } from "@/main";

const { user, getUser } = useUser();
const { addPersonVisible, addPersonVisibility } = useModals();
const personInfo = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const addPerson = async () => {
  await api(`users/${localStorage.getItem("userId")}`, {
    method: "PATCH",
    body: JSON.stringify(personInfo),
  });
  await getUser(localStorage.getItem("userId"));
};

onMounted(async () => {
  await getUser(localStorage.getItem("userId"));
  console.log(user.value);
});
</script>

<template>
  <div>
    <h1>Личный кабинет</h1>

    <div v-if="user">
      <h2>Имя Фамилия</h2>
      <p>{{ user.first_name }}</p>
      <p>{{ user.last_name }}</p>
      <h2>Email</h2>
      <p>{{ user.email }}</p>
      <h2>Пол</h2>
      <p>{{ user.sex }}</p>
      <img :src="`${imageUrl}/${user.photo}`" alt="user photo" />
    </div>

    <div>
      <h2>Люди</h2>
      <button @click="addPersonVisibility">Добавить</button>
      <div v-for="person in user.peoples" :key="person.id">
        <p>{{ person.first_name }}</p>
        <p>{{ person.last_name }}</p>
      </div>
    </div>

    <div class="modal" v-show="addPersonVisible">
      <form @submit.prevent class="modalWrapper">
        <button class="closeButton" @click="addPersonVisibility">Назад</button>
        <label>Имя</label>
        <input type="text" v-model="personInfo.first_name" />
        <label>Фамилия</label>
        <input type="text" v-model="personInfo.last_name" />
        <label>Email</label>
        <input type="text" v-model="personInfo.email" />
        <label>Пароль</label>
        <input type="text" v-model="personInfo.password" />
        <button type="submit" @click="addPerson">Добавить</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
