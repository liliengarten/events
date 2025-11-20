<script setup>
import { useEvents } from "@/store";
import { onMounted } from "vue";
import { useModals } from "@/store";
import EventCard from "@/components/EventCard.vue";
import { api, checkAuthorization } from "@/main";

const { getEvents, events, getEventPlaces, eventPlaces } = useEvents();
const { addEventVisible, addEventVisibility } = useModals();

const addEvent = async (event) => {
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
    await api("/events", {
      method: "POST",
      body: formData,
    });
    await getEvents();
    addEventVisibility();
  } else {
    alert(
      "Время начала мероприятия должно быть не раньше 9:00, а окончание не позже 21:00"
    );
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
  <div class="wrapper">
    <button @click="addEventVisibility" class="btn btn-success">
      Добавить мероприятие
    </button>
    <div v-if="events" class="accordion w-50" id="events">
      <div v-for="event in events" :key="event.id" class="accordion-item">
        <h2 class="accordion-header">
          <button
            v-html="event.name"
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${event.id}`"
            aria-expanded="true"
            aria-controls="collapseOne"
          ></button>
        </h2>
        <div
          :id="event.id"
          class="accordion-collapse collapse"
          data-bs-parent="#events"
        >
          <div class="accordion-body">
            <event-card :event="event"></event-card>
          </div>
        </div>
      </div>
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

.accordion {
  z-index: 0;
}

.btn {
  position: fixed;
  top: 10%;
  left: 3%;
}
</style>
