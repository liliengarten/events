<script setup>
import { defineProps } from "vue";
import { imageUrl } from "@/main";

const props = defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <p>1</p>
    <div>
      <p>{{ props.feedback.user.first_name }}</p>
      <p>{{ props.feedback.user.last_name }}</p>
    </div>
    <div>
      <p>{{ props.feedback.text }}</p>
    </div>
    <img
      :src="`${imageUrl}/${props.feedback.img_raiting}`"
      alt="feedback image"
    />
  </div>
</template>

<style scoped>
img {
  width: 450px;
  height: auto;
}
</style>
