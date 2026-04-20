<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="card">
    <RouterLink :to="to">
      <div class="card-image">
        <img v-if="image" :src="image" :alt="title" :title="title" />
      </div>
      <div class="card-content">
        <h3>{{ title }}</h3>
      </div>
    </RouterLink>
  </div>
</template>
<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  padding: 2rem 3rem;
  justify-items: center;
}
.card {
  background-color: var(--oscuro);
  border-style: ridge;
  border-color: var(--dorado);
  border-radius: 1rem;
  overflow: hidden;
  width: 400px;
  height: 450px;
  display: flex;
  flex-direction: column;
}

.card a {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.card-content {
  background-color: var(--gris);
  flex: 1;
  display: flex;
  align-items: center;
  border-top: 0.2px solid var(--dorado);
}

.card-image {
  width: 100%;
  height: 75%;
  flex-shrink: 0;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card h3 {
  margin: 0;
  padding: 0 1rem;
  color: var(--blanco);
  font-family: var(--fuente-titulo);
  font-size: clamp(1rem, 2vw, 1.6rem);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  max-height: 3rem;
}
@media (min-width: 768px) and (max-width: 1026px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(300px, 340px));
    justify-content: center;
    gap: 1.75rem;
    padding: 2rem 1rem;
  }

  .card {
    width: 320px;
    height: 370px;
  }

  .card-image {
    height: 265px;
  }

  .card h3 {
    padding: 0 0.9rem;
  }
}
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 1.5rem;
    padding: 1.5rem 1rem;
  }

  .card {
    width: min(88vw, 320px);
    height: 320px;
  }

  .card-image {
    height: 220px;
  }

  .card h3 {
    padding: 0 0.85rem;
  }
}
</style>
