<script setup>
// import FeedbackCard from "@/components/FeedbackCard.vue";
import { computed, onMounted } from "vue";
import { useEvents, useModals } from "@/store";
import { useRoute } from "vue-router";
import { api, checkAuthorization, imageUrl } from "@/main";
import FeedbackCard from "@/components/FeedbackCard.vue";
import router from "@/router";

const route = useRoute();
const {
  addFeedbackVisible,
  addFeedbackVisibility,
  editEventVisible,
  editEventVisibility,
  deleteEventVisible,
  deleteEventVisibility,
} = useModals();
const {
  event,
  getEvent,
  getEventPlaces,
  feedbacks,
  eventPlaces,
  getFeedback,
  getEvents,
} = useEvents();
let eventId = route.path.split("/");
eventId = eventId[eventId.length - 1];

const addFeedback = async (event) => {
  const formData = new FormData(event.target);

  await api(`/feedbacks/${eventId}`, {
    method: "POST",
    body: formData,
  });
  await getFeedback();
};

const bookEvent = async () => {
  await api("/book-event", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      event_id: eventId,
    }),
  });
};

const editEvent = async (event) => {
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

    await api(`/events/${eventId}`, {
      method: "PATCH",
      body: formData,
    });
    await getEvents();
    editEventVisibility();
  } else {
    alert(
      "Время начала мероприятия должно быть не раньше 9:00, а окончание не позже 21:00"
    );
    return;
  }
};

const deleteEvent = async () => {
  await api(`/events/${eventId}`, {
    method: "DELETE",
  });
  router.push("/events");
};

const placesLeft = computed(() => {
  return event.value.event_counter - event.value.current_people;
});

onMounted(async () => {
  if (checkAuthorization()) {
    await getEvent(eventId);
    await getEventPlaces();
    await getFeedback(eventId);
  }
});
</script>

<template>
  <div class="wrapper px-5">
    <div>
      <div class="w-50">
        <h2 class="text-start" v-html="event.name"></h2>
        <div>
          <h3>Организатор</h3>
        </div>
        <div class="d-flex gap-3">
          <div>
            <h4>Рейтинг</h4>
            <p>{{ event.raiting }}</p>
          </div>
          <div>
            <h4>Участники</h4>
            <p>{{ event.event_counter }}</p>
          </div>
          <div>
            <h4>Осталость мест</h4>
            <p>{{ placesLeft }}</p>
          </div>
        </div>
        <p class="text-start">{{ event.description }}</p>
        <div class="d-flex gap-3">
          <div>
            <h3 class="text-start">Начало</h3>
            <p class="text-start">{{ event.start_date }}</p>
          </div>
          <div>
            <h3 class="text-start">Конец</h3>
            <p class="text-start">{{ event.end_date }}</p>
          </div>
        </div>
        <div>
          <h2>Отзывы</h2>
          <div class="modall" v-show="addFeedbackVisible">
            <div class="modalWrapper">
              <button class="closeButton" @click="addFeedbackVisibility">
                Назад
              </button>
              <form @submit.prevent="addFeedback" enctype="multipart/form-data">
                <label>Отзыв</label>
                <textarea type="text" name="text" />
                <label>Рейтинг</label>
                <input type="Number" min="0" max="5" name="raiting" />
                <label>Фото</label>
                <input type="file" name="img_raiting" />
                <button type="submit">Отправить</button>
              </form>
            </div>
          </div>
          <button @click="addFeedbackVisibility">Оставить отзыв</button>
          <feedback-card
            v-for="feedback in feedbacks"
            :key="feedback.id"
            :feedback="feedback"
          ></feedback-card>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column gap-3">
      <img :src="`${imageUrl}/${event.img}`" alt="event photo" />
      <button @click="bookEvent" class="btn btn-outline-success">
        Записаться на мероприятие
      </button>
      <div v-show="event.owner">
        <button @click="deleteEventVisibility" class="btn btn-outline-danger">
          Удалить мероприятие
        </button>
        <button @click="editEventVisibility" class="btn btn-outline-warning">
          Редактировать мероприятие
        </button>
      </div>
    </div>
    <div class="modall" v-show="editEventVisible">
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

    <div class="modall" v-show="deleteEventVisible">
      <div class="modalWrapper w-50 d-flex flex-column">
        <h1>Подтвердите удаление мероприятия</h1>
        <div class="d-flex gap-3">
          <button class="btn btn-danger" @click="deleteEventVisibility">
            Я передумал
          </button>
          <button class="btn btn-success" @click="deleteEvent">
            Подтверждаю
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: auto;
  max-height: 801vh;
}
</style>
