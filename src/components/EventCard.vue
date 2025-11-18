<script setup>
import { computed, defineProps, ref } from "vue";
import { api } from "@/main";
import { useEvents, useModals } from "@/store";
import FeedbackCard from "@/components/FeedbackCard.vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const detailed = ref(false);
const feedbacks = ref([]);
const { editEventVisible, editEventVisibility } = useModals();
const { getEvents, eventPlaces } = useEvents();

const changeVisibility = () => {
  detailed.value = !detailed.value;
};

const getFeedback = async () => {
  const data = await api(`/feedbacks/${props.event.id}`, {
    method: "GET",
  });
  console.log(data);
  feedbacks.value = data;
};

const handleMore = async () => {
  await getFeedback();
  changeVisibility();
};
const deleteEvent = async () => {
  await api(`/events/${props.event.id}`, {
    method: "DELETE",
  });
};

const detailedOrClose = computed(() => {
  if (detailed.value === false) return "Подробнее";
  else return "Закрыть";
});

const editEvent = (event) => {
  const formData = new FormData(event.target);
  let start = formData.get("start_date");
  let end = formData.get("end_date");

  start = start.split("T");
  end = end.split("T");

  if (
    Number(start[1].split(":")[0]) >= 9 &&
    Number(end[1].split(":")[0]) < 21
  ) {
    formData.set("start_date", `${start[0]} ${start[1]}`);
    formData.set("end_date", `${end[0]} ${end[1]}`);
    api(`/events/${props.event.id}`, {
      method: "PATCH",
      body: formData,
    });
    getEvents();
    editEventVisibility();
  } else {
    return;
  }
};
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

      <div>
        <h2>Отзывы</h2>
        <feedback-card
          v-for="feedback in feedbacks"
          :key="feedback.id"
          :feedback="feedback"
        ></feedback-card>
      </div>

      <button @click="editEventVisibility" v-show="props.event.owner">
        Изменить мероприятие
      </button>
      <button @click="deleteEvent" v-show="props.event.owner">
        Удалить мероприятие
      </button>
    </div>
    <button @click="handleMore">{{ detailedOrClose }}</button>
  </div>

  <div class="modal" v-show="editEventVisible">
    <div class="modalWrapper">
      <button class="closeButton" @click="editEventVisibility">Назад</button>
      <form @submit.prevent="editEvent" enctype="multipart/form-data">
        <p>Заголовок</p>
        <input type="text" name="name" />
        <p>Описание</p>
        <input type="text" name="description" />
        <p>Фото</p>
        <input type="file" name="img" />
        <p>Дата начала</p>
        <input type="datetime-local" name="start_date" />
        <p>Дата окончания</p>
        <input type="datetime-local" name="end_date" />
        <p>Место</p>
        <select name="event_place_id">
          <option
            v-for="eventPlace in eventPlaces"
            :key="eventPlace.id"
            :value="eventPlace.id"
          >
            {{ eventPlace.name }}
            {{ eventPlace.city }}
            {{ eventPlace.street }}
            {{ eventPlace.house_number }}
            {{ eventPlace.office }}
          </option>
        </select>
        <p>Количество мест</p>
        <input type="text" name="event_counter" />
        <button type="submit">Изменить мероприятие</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.eventWrapper {
  border-bottom: 1px solid #a1a1a1;
}
</style>
