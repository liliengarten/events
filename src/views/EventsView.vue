<script setup>
import { useEvents } from "@/store";
import { onMounted } from "vue";
import { useModals } from "@/store";
import EventCard from "@/components/EventCard.vue";
import { api, checkAuthorization } from "@/main";

const { getEvents, events, getEventPlaces, eventPlaces } = useEvents();

const { addEventVisible, addEventVisibility } = useModals();

const addEvent = (event) => {
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
    api("/events", {
      method: "POST",
      body: formData,
    });
    getEvents();
    addEventVisibility();
  } else {
    return;
  }
};

onMounted(() => {
  if (checkAuthorization()) {
    getEvents();
    getEventPlaces();
  }
});
</script>
<template>
  <div>
    <div class="buttons">
      <button class="btn btn-outline-success" @click="addEventVisibility">
        Добавить мероприятие
      </button>
    </div>
    <div class="accordion" id="eventsAccordion">
      <div v-for="event in events" :key="event.id" class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collpace"
            :data-bs-target="`#${event.id}`"
          >
            {{ event.name }}
          </button>
          <div
            :id="event.id"
            class="accordion-collapse collapse"
            data-bs-parent="#eventsAccordion"
          >
            <div class="accordion-body">
              <event-card event="event"></event-card>
            </div>
          </div>
        </h2>
      </div>
    </div>

    <div v-if="events" class="hideScroll">
      <event-card
        v-for="event in events"
        :key="event.id"
        :event="event"
      ></event-card>
    </div>
    <div class="modall" v-show="addEventVisible">
      <div class="modalWrapper">
        <button class="closeButton" @click="addEventVisibility">Назад</button>
        <form @submit.prevent="addEvent" enctype="multipart/form-data">
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
          <button type="submit">Добавить мероприятие</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
}
</style>
