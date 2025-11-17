<script setup>
import { defineProps, ref } from "vue";

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
</script>

<template>
  <div class="eventWrapper">
    <p v-html="props.event.name"></p>
    <p>{{ props.event.start_date }}</p>
    <div class="detailed" v-show="detailed">
      <p>Конец</p>
      <p>{{ props.event.end_date }}</p>
      <p>Место проведения</p>
      <p>{{ props.event.event_place[0] }}</p>
      <p>{{ props.event.event_place[1] }}</p>
    </div>

    <button @click="changeVisibility">Подробнее</button>
  </div>
</template>

<style scoped>
.eventWrapper {
  border: 1px solid black;
}

.detailed {
  transition: 0.5s;
}
</style>
