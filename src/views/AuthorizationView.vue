<script setup>
import { useModals } from "@/store";
import { api } from "@/main";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { registrationVisible, loginVisible, authorizationVisibility } =
  useModals();

const loginInfo = reactive({
  email: "",
  password: "",
});

const attemptRegistration = (event) => {
  const formData = new FormData(event.target);
  let date = formData.get("birth_date").split("-");
  date = `${date[1]}-${date[2]}-${date[0]}`;
  formData.set("birth_date", date);

  if (formData.get("password") === formData.get("passwordRepeat")) {
    const response = api("/registration", { method: "POST", body: formData });
    if (response.code === 200) {
      authorizationVisibility();
    }
  }
};

const attemptLogin = async () => {
  try {
    const data = await api("/authorization", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    localStorage.setItem("userToken", data.token);
    router.push("/about");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="modalWrapper">
    <form
      enctype="multipart/form-data"
      v-show="registrationVisible"
      @submit.prevent="attemptRegistration"
    >
      <label>E-mail</label>
      <input type="text" name="email" />
      <label>Имя</label>
      <input type="text" name="first_name" />
      <label>Фамилия</label>
      <input type="text" name="last_name" />
      <label>Фото</label>
      <input type="file" name="photo" />
      <label>Дата рождения</label>
      <input type="date" name="birth_date" />

      <label>Пол</label>
      <select name="sex">
        <option value="мужской">Мужской</option>
        <option value="женский">Женский</option>
      </select>
      <label>Пароль</label>
      <input type="password" name="password" />
      <label>Повтор пароля</label>
      <input type="password" name="passwordRepeat" />

      <button type="submit">Зарегистрироваться</button>
      <p>
        Уже зарегистрированы?
        <a href="#" @click="authorizationVisibility">Войти</a>
      </p>
    </form>
    <form v-show="loginVisible" @submit.prevent="attemptLogin">
      <label>E-mail</label>
      <input type="text" v-model="loginInfo.email" />
      <label>Пароль</label>
      <input type="password" v-model="loginInfo.password" />

      <button type="submit">Войти</button>
      <p>
        Нет аккаунта?
        <a href="#" @click="authorizationVisibility">Зарегистрируйтесь</a>
      </p>
    </form>
  </div>
</template>

<style scoped></style>
