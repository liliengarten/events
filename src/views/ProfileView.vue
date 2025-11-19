<script setup>
import { useEvents, useModals, useUser } from "@/store";
import { onMounted, reactive, ref } from "vue";
import { api, imageUrl } from "@/main";

const { user, getUser } = useUser();
const { getEventPlaces, eventPlaces } = useEvents();
const { addPlaceVisible, addPlaceVisibility } = useModals();
const persons = ref([]);

const {
  addPersonVisible,
  addPersonVisibility,
  editProfileVisible,
  editProfileVisibility,
} = useModals();

const personInfo = reactive({
  first_name: "",
  last_name: "",
  date: "",
  sex: "",
});
const profileInfo = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});
const place = reactive({
  name: "",
  city: "",
  street: "",
  house_number: 0,
  office: 0,
});
const addToPersons = () => {
  let date = personInfo.date.split("-");
  date = `${date[2]}-${date[1]}-${date[0]}`;
  let person = {
    first_name: personInfo.first_name,
    last_name: personInfo.last_name,
    date: date,
    sex: personInfo.sex,
  };
  console.log(person);
  persons.value.push(person);

  personInfo.first_name = "";
  personInfo.last_name = "";
  personInfo.date = "";
  personInfo.sex = "";
};
const addPersons = async () => {
  await api("/users/peoples", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      peoples: persons.value,
    }),
  });
  await getUser(localStorage.getItem("userId"));
  persons.value = [];
  addPersonVisibility();
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

const deletePerson = async (personId) => {
  await api(`/users/peoples/${personId}`, {
    method: "DELETE",
  });
  await getUser(localStorage.getItem("userId"));
};
const editProfile = async () => {
  await api(`/users/${user.value.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(profileInfo),
  });
  await getUser(user.value.id);
  editProfileVisibility();
};
const deletePlace = async (id) => {
  await api(`/event-places/${id}`, {
    method: "DELETE",
  });
  await getEventPlaces();
};

onMounted(async () => {
  await getUser(localStorage.getItem("userId"));
  await getEventPlaces();
});
</script>

<template>
  <div class="p-5 wrapper">
    <h1>Личный кабинет</h1>
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-column align-items-start" v-if="user">
        <h2>Имя Фамилия</h2>
        <div class="d-flex gap-2">
          <p>{{ user.first_name }}</p>
          <p>{{ user.last_name }}</p>
        </div>
        <h2>Email</h2>
        <p>{{ user.email }}</p>
        <img :src="`${imageUrl}/${user.photo}`" alt="user photo" />
        <button class="mainB" @click="editProfileVisibility">
          Изменить профиль
        </button>
      </div>

      <div>
        <div>
          <div class="d-flex gap-3 align-items-center">
            <h2>Люди</h2>
            <button class="mainB" @click="addPersonVisibility">Добавить</button>
          </div>
          <div
            class="d-flex gap-3 align-items-center"
            v-for="person in user.peoples"
            :key="person.id"
          >
            <p>{{ person.first_name }}</p>
            <p>{{ person.last_name }}</p>
            <button @click="deletePerson(person.id)">Удалить</button>
          </div>
        </div>
        <div>
          <div
            class="d-flex flex-column gap-3 align-items-center overflow-y-scroll mh"
          >
            <h2>Ваши места проведения</h2>
            <button @click="addPlaceVisibility">Добавить</button>
            <div
              class="d-flex gap-3 justify-content-start align-items-start"
              v-for="place in eventPlaces"
              :key="place.id"
            >
              <div class="d-flex gap-2 align-items-center">
                <p>Город {{ place.city }}</p>
                <p>Улица {{ place.street.replace("Street", "") }}</p>
                <p>Дом {{ place.house_number }}</p>
                <p>Офис {{ place.office }}</p>
                <button
                  class="btn btn-outline-danger"
                  @click="deletePlace(place.id)"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modall" v-show="addPersonVisible">
      <form @submit.prevent class="modalWrapper d-flex flex-row">
        <div class="d-flex flex-column">
          <button class="closeButton" @click="addPersonVisibility">
            Назад
          </button>
          <label>Имя</label>
          <input type="text" required v-model="personInfo.first_name" />
          <label>Фамилия</label>
          <input type="text" required v-model="personInfo.last_name" />
          <label>Дата рождения</label>
          <input type="date" required v-model="personInfo.date" />
          <label>Пол</label>
          <input type="text" required v-model="personInfo.sex" />
          <button @click="addToPersons">Добавить</button>
          <button @click="addPersons">Отправить</button>
        </div>
        <div>
          <h2>Люди</h2>

          <div v-for="person in persons" :key="person.name + person.date">
            <p>{{ person.first_name }}</p>
            <p>{{ person.last_name }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="modall" v-show="editProfileVisible">
    <form @submit.prevent class="modalWrapper d-flex flex-row">
      <div class="d-flex flex-column">
        <button class="closeButton" @click="editProfileVisibility">
          Назад
        </button>
        <label>Имя</label>
        <input type="text" required v-model="profileInfo.first_name" />
        <label>Фамилия</label>
        <input type="text" required v-model="profileInfo.last_name" />
        <label>Email</label>
        <input type="email" required v-model="profileInfo.email" />
        <label>Пароль</label>
        <input type="password" required v-model="profileInfo.password" />
        <button @click="editProfile">Изменить</button>
      </div>
    </form>
  </div>

  <div class="modall" v-show="addPlaceVisible">
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
</template>

<style scoped>
.mh {
  max-height: 250px;
}
</style>
