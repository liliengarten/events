<script setup>
import { useAboutInfo } from "@/store";
import { onMounted } from "vue";
import { imageUrl } from "@/main";
const { aboutInfo, getAbout } = useAboutInfo();

onMounted(() => {
  getAbout();
});
</script>
<template>
  <div>
    <h1>О проекте</h1>
    <p>{{ aboutInfo.title?.name }}</p>
    <p>{{ aboutInfo.text?.data }}</p>

    <img
      v-if="aboutInfo.img?.url"
      :src="`${imageUrl}/${aboutInfo.img.url}`"
      alt="project photo"
    />
  </div>
</template>
<style scoped></style>
