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
      <h2>Título: {{ title }}</h2>
      <h2>Fecha: {{ date }}</h2>
      <h3>Descripcion: {{ description }}</h3>
    </div>
  </section>
</template>
