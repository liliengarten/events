<script setup>
import { api } from "@/main";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useModals } from "@/store";

const router = useRouter();
const errors = ref([]);
const { errorVisible, errorVisibility } = useModals();

const attemptRegistration = async (event) => {
  const formData = new FormData(event.target);

  if (validateRegistration(formData)) {
    errors.value = [];
    let date = formData.get("birth_date").split("-");
    date = `${date[1]}-${date[2]}-${date[0]}`;
    formData.set("birth_date", date);

    if (formData.get("password") === formData.get("passwordRepeat")) {
      await api("/registration", { method: "POST", body: formData });
    }
    router.push("/login");
  } else {
    errorVisibility();
    setTimeout(() => {
      errorVisibility();
    }, 3000);
  }
};
const validateRegistration = (formData) => {
  errors.value = [];
  const latin = /[a-zA-Z]/;
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const password = formData.get("password");

  let containsLatin = false;
  let includesNumbers = false;
  let containsUpperCase = false;
  let containsLowerCase = false;

  if (latin.test(first_name) || latin.test(last_name)) {
    containsLatin = true;
  }
  for (let number of numbers) {
    if (password.includes(number)) {
      includesNumbers = true;
      break;
    }
  }

  for (let letter of password) {
    if (letter === letter.toUpperCase()) {
      containsUpperCase = true;
    } else if (letter === letter.toLowerCase()) {
      containsLowerCase = true;
    }

    if (containsUpperCase && containsLowerCase) break;
  }

  if (containsLatin) {
    errors.value.push(
      "Поля имени и фамилии не могут содержать латинских символов!"
    );
  }
  if (!includesNumbers) {
    errors.value.push("Пароль должен содержать хотя бы одну цифру!");
  }
  if (!containsUpperCase) {
    errors.value.push("Пароль должен содержать хотя бы одну заглавную букву!");
  }
  if (!containsLowerCase) {
    errors.value.push("Пароль должен содержать хотя бы одну строчную букву!");
  }

  if (
    !includesNumbers ||
    !containsUpperCase ||
    !containsLowerCase ||
    containsLatin
  ) {
    return false;
  }
  return true;
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-full">
    <form
      class="modalWrapper rounded-5 d-flex flex-column gap-4"
      enctype="multipart/form-data"
      @submit.prevent="attemptRegistration"
    >
      <h2>Регистрация</h2>
      <div
        class="d-flex flex-column align-items-start justify-content-center flex-row gap-5"
      >
        <div class="d-flex justify-content-between align-items-start">
          <div class="w-50">
            <div class="d-flex flex-column">
              <label>Имя</label>
              <input required type="text" name="first_name" />
            </div>
            <div class="d-flex flex-column">
              <label>Фамилия</label>
              <input required type="text" name="last_name" />
            </div>

            <div>
              <div
                class="d-flex flex-row align-items-center justify-content-between gap-2"
              >
                <div class="d-flex flex-column">
                  <label>Пол</label>
                  <select required name="sex">
                    <option value="мужской">Мужской</option>
                    <option value="женский">Женский</option>
                  </select>
                </div>
                <div class="d-flex flex-column">
                  <label>Дата рождения</label>
                  <input required type="date" name="birth_date" />
                </div>
              </div>
              <div class="d-flex flex-column">
                <label>Фото</label>
                <input required type="file" name="photo" />
              </div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-column">
              <label>E-mail</label>
              <input required type="email" name="email" />
            </div>
            <label>Пароль</label>
            <input required type="password" name="password" />
            <label>Повтор пароля</label>
            <input required type="password" name="passwordRepeat" />
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column justify-content-center align-items-center gap-2"
      >
        <div class="d-flex justify-content-center align-items-center gap-2">
          <p class="w-100">Соглашение на обработку персональных данных</p>
          <input required type="checkbox" />
        </div>

        <button class="btn btn-success w-50" type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  </div>
  <div class="modall" v-show="errorVisible">
    <div class="modalWrapper d-flex flex-column gap-3">
      <p v-for="error in errors" :key="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
