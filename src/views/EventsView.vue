<script setup>
import { useEvents } from "@/store";
import { onMounted, reactive } from "vue";
import { useModals } from "@/store";
import EventCard from "@/components/EventCard.vue";
import { api } from "@/main";

const { getEvents, events, getEventPlaces, eventPlaces } = useEvents();

const {
  addEventVisible,
  addEventVisibility,
  addPlaceVisible,
  addPlaceVisibility,
} = useModals();

const place = reactive({
  name: "",
  city: "",
  street: "",
  house_number: 0,
  office: 0,
});

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

const addPlace = async () => {
  await api("/event-places", {
    method: "POST",
    body: JSON.stringify(place),
    headers: {
      "Content-type": "application/json",
    },
  });
  await getEventPlaces();
  addPlaceVisibility();
};

onMounted(() => {
  getEvents();
  getEventPlaces();
});
</script>
<template>
  <div>
    <div class="buttons">
      <button class="mainB" @click="addEventVisibility">
        Добавить мероприятие
      </button>
      <button class="mainB" @click="addPlaceVisibility">
        Добавить место проведения
      </button>
    </div>
    <div v-if="events" class="hideScroll">
      <event-card
        v-for="event in events"
        :key="event.id"
        :event="event"
      ></event-card>
    </div>

    <div class="modal" v-show="addEventVisible">
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

    <div class="modal" v-show="addPlaceVisible">
      <div class="modalWrapper">
        <button class="closeButton" @click="addPlaceVisibility">Назад</button>
        <form @submit.prevent="addPlace">
          <p>Название организации</p>
          <input type="text" v-model="place.name" />
          <p>Город</p>
          <input type="text" v-model="place.city" />
          <p>Улица</p>
          <input type="text" v-model="place.street" />
          <p>Номер дома</p>
          <input type="text" v-model="place.house_number" />
          <p>Офис</p>
          <input type="text" v-model="place.office" />

          <button type="submit">Добавить место проведения</button>
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
