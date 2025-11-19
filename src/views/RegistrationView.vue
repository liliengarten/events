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
      class="modalWrapper rounded-5"
      enctype="multipart/form-data"
      @submit.prevent="attemptRegistration"
    >
      <h2>Регистрация</h2>
      <div class="d-flex align-items-start flex-row gap-5">
        <div>
          <div class="d-flex flex-column">
            <label>Имя</label>
            <input type="text" name="first_name" />
          </div>
          <div class="d-flex flex-column">
            <label>Фамилия</label>
            <input type="text" name="last_name" />
          </div>
          <div class="d-flex flex-column">
            <label>E-mail</label>
            <input type="text" name="email" />
          </div>

          <div>
            <div class="d-flex flex-row">
              <div class="d-flex flex-column">
                <label>Пол</label>
                <select name="sex">
                  <option value="мужской">Мужской</option>
                  <option value="женский">Женский</option>
                </select>
              </div>
              <div class="d-flex flex-column">
                <label>Фото</label>
                <input type="file" name="photo" />
              </div>
            </div>
            <div class="d-flex flex-column">
              <label>Дата рождения</label>
              <input type="date" name="birth_date" />
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <label>Пароль</label>
          <input type="password" name="password" />
          <label>Повтор пароля</label>
          <input type="password" name="passwordRepeat" />
        </div>
      </div>

      <button class="mainB" type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
.cont {
  border: 1px solid black;
  margin-bottom: 52px;
}

.accordion-collapse {
  transition: height 0.4s ease-in-out, opacity 0.3s ease-in-out !important;
}

/* Плавное изменение фона кнопки */
.accordion-button {
  transition: all 0.3s ease-in-out;
}

.accordion-button:not(.collapsed) {
  background-color: #e7f1ff;
  color: #0c63e4;
}
</style>
