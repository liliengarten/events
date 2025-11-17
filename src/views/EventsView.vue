<script setup>
import { useEvents } from "@/store";
import { onMounted } from "vue";
import EventCard from "@/components/EventCard.vue";

const { getEvents, events } = useEvents();

onMounted(() => {
  getEvents();
});
</script>
<template>
  <h1>Мероприятия</h1>
  <div v-if="events">
    <event-card
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></event-card>
  </div>
</template>

<style scoped></style>
