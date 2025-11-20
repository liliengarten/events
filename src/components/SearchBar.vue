<script setup>
import { ref } from "vue";
import { baseUrl } from "@/main";
import { useEvents } from "@/store";

const searchField = ref("");
const { searchEvents } = useEvents();

const search = async () => {
  const response = await fetch(`${baseUrl}/search/query=${searchField.value}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
    },
  });
  const { events } = await response.json();
  searchEvents(events[0]);
};
</script>

<template>
  <div class="flex-row w-25 d-flex gap-2">
    <input
      class="w-100 rounded-3 p-1 border-1"
      type="text"
      v-model="searchField"
    />
    <button @click="search" class="btn btn-success">Поиск</button>
  </div>
</template>

<style scoped></style>
