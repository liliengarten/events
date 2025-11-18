import { computed, ref } from "vue";
import { api } from "@/main";

const user = ref({});
const userToken = ref(localStorage.getItem("userToken") || "");

const aboutInfo = ref([]);
const events = ref([]);
const eventPlaces = ref([]);

export const useAboutInfo = () => {
  const getAbout = async () => {
    const data = await api("/about");
    aboutInfo.value = data;
  };

  return {
    aboutInfo,
    getAbout,
  };
};

export const useEvents = () => {
  const getEvents = async () => {
    const data = await api("/events", {});
    events.value = data;
  };

  const getEventPlaces = async () => {
    const data = await api("/event-places", {
      method: "GET",
    });
    eventPlaces.value = data;
  };

  return {
    events,
    getEvents,
    getEventPlaces,
    eventPlaces,
  };
};

export const useModals = () => {
  const registrationVisible = ref(true);
  const loginVisible = ref(false);
  const addEventVisible = ref(false);
  const editEventVisible = ref(false);
  const addPersonVisible = ref(false);
  const addPlaceVisible = ref(false);

  const authorizationVisibility = () => {
    loginVisible.value = !loginVisible.value;
    registrationVisible.value = !registrationVisible.value;
  };
  const addEventVisibility = () => {
    addEventVisible.value = !addEventVisible.value;
  };
  const editEventVisibility = () => {
    editEventVisible.value = !editEventVisible.value;
  };
  const addPersonVisibility = () => {
    addPersonVisible.value = !addPersonVisible.value;
  };
  const addPlaceVisibility = () => {
    addPlaceVisible.value = !addPlaceVisible.value;
  };
  return {
    registrationVisible,
    loginVisible,
    authorizationVisibility,
    addEventVisible,
    addEventVisibility,
    editEventVisible,
    editEventVisibility,
    addPersonVisible,
    addPersonVisibility,
    addPlaceVisible,
    addPlaceVisibility,
  };
};

export const useUser = () => {
  const getUser = async (id) => {
    const data = await api(`/users/${id}`, {
      method: "GET",
    });

    user.value = data.body[0];
  };
  const setToken = (token) => {
    userToken.value = token;
  };
  const isAuthorized = computed(() => {
    if (userToken.value !== "") return true;
    else return false;
  });
  return {
    user,
    getUser,
    userToken,
    setToken,
    isAuthorized,
  };
};
