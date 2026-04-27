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
<style>
.details {
  width: 100%;
  max-width: 720px;
  display: grid;
  grid-template-columns: 40fr 60fr;
  color: var(--blanco);
  align-items: center;
  background-color: var(--superficie);
  border-radius: 0.7rem;
  gap: 1rem;

  padding: 1rem;
  margin: 1rem;
}
.details h3:first-child {
  font-family: var(--fuente-titulo);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--blanco);
}
.details-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  width: 260px;
  border-radius: 0.7rem;
}
.details-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 0.7rem;
}

.details-description h3 {
  font-family: var(--fuente-titulo);
  font-size: clamp(0.82rem, 1.5vw, 1rem);
  color: var(--gris);
  font-weight: 400;
}

.details-description h2 {
  font-family: var(--fuente-cuerpo);
  font-size: clamp(0.78rem, 1.2vw, 0.9rem);
  line-height: 1.55;
  font-weight: 400;
}

@media (max-width: 768px) {
  .details {
    display: flex;
    flex-direction: column;
    margin: 0.8rem auto;
    max-width: 95%;
    padding: 0.85rem;
  }
  .details-img {
    height: auto;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .details-description h2 {
    font-size: 1.4rem;
  }
  .details-description h3 {
    font-size: 1rem;
  }
}
</style>
