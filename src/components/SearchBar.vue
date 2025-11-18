<script setup>
import { baseUrl } from "@/main";
import { ref } from "vue";

const searchField = ref("");
const search = async () => {
  const response = await fetch(`${baseUrl}/search/query=${searchField.value}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
    },
  });
  const { events } = await response.json();
  console.log(events);
};
</script>

<template>
  <form @submit.prevent="search">
    <input type="text" v-model="searchField" />
    <button type="submit">Поиск</button>
  </form>
</template>

<style scoped></style>
