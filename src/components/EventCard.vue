<script setup>
import { computed, defineProps, ref } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const detailed = ref(false);

const changeVisibility = () => {
  detailed.value = !detailed.value;
};

const handleMore = async () => {
  changeVisibility();
};

const detailedOrClose = computed(() => {
  if (detailed.value === false) return "Подробнее";
  else return "Закрыть";
});
</script>

<template>
  <div class="eventWrapper">
    <h2 v-html="props.event.name"></h2>
    <p>{{ props.event.start_date }}</p>
    <div class="detailed" v-show="detailed">
      <p>Конец</p>
      <p>{{ props.event.end_date }}</p>
      <h3>Место проведения</h3>
      <p>{{ props.event.event_place[0] }}</p>
      <p>{{ props.event.event_place[1] }}</p>
      <p>{{ props.event.owner }}</p>
      <h3>Количество участников</h3>
      <p>{{ props.event.current_people }}</p>
      <h3>Рэйтинг</h3>
      <p>{{ props.event.rating }}</p>
      <router-link :to="{ name: 'event', params: { id: props.event.id } }"
        >Страница мероприятия</router-link
      >
    </div>
    <button @click="handleMore">{{ detailedOrClose }}</button>
  </div>
</template>

<style scoped>
.eventWrapper {
  border-bottom: 1px solid #a1a1a1;
}
</style>
