<script setup>
import { api } from "@/main";
import { useRouter } from "vue-router";

const router = useRouter();
const attemptRegistration = async (event) => {
  const formData = new FormData(event.target);
  let date = formData.get("birth_date").split("-");
  date = `${date[1]}-${date[2]}-${date[0]}`;
  formData.set("birth_date", date);

  if (formData.get("password") === formData.get("passwordRepeat")) {
    await api("/registration", { method: "POST", body: formData });
  }
  router.push("/login");
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
              <input required type="text" name="email" />
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
</template>

<style scoped></style>
