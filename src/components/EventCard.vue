<script setup>
import { defineProps } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="eventWrapper">
    <h2 v-html="props.event.name"></h2>
    <p>{{ props.event.start_date }}</p>
    <p>Конец</p>
    <p>{{ props.event.end_date }}</p>
    <h3>Место проведения</h3>
    <p>{{ props.event.owner }}</p>
    <h3>Количество участников</h3>
    <p>{{ props.event.current_people }}</p>
    <h3>Рэйтинг</h3>
    <p>{{ props.event.rating }}</p>
    <router-link :to="{ name: 'event', params: { id: props.event.id } }"
      >Страница мероприятия</router-link
    >
  </div>
</template>

<style scoped></style>
