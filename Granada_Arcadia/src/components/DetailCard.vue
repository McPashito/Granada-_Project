<script setup>
defineProps({
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
})
</script>
<template>
  <section class="details">
    <div class="details-img">
      <img v-if="image" :src="image" alt="title" />
    </div>
    <div class="details-description">
      <h3>Título: {{ title }}</h3>
      <h3>Fecha: {{ date }}</h3>
      <h2>Descripcion: {{ description }}</h2>
    </div>
  </section>
</template>
