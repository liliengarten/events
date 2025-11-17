import { ref } from "vue";
import { api } from "@/main";

const aboutInfo = ref({});
const events = ref({});

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
  return {
    events,
    getEvents,
  };
};

export const useModals = () => {
  const registrationVisible = ref(true);
  const loginVisible = ref(false);
  const authorizationVisibility = () => {
    loginVisible.value = !loginVisible.value;
    registrationVisible.value = !registrationVisible.value;
  };

  return {
    registrationVisible,
    loginVisible,
    authorizationVisibility,
  };
};
