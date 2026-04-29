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
.card {
  background-color: var(--superficie);

  border-radius: 0.4rem;
  overflow: hidden;
  width: 8rem;
  height: 10.5rem;
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
  background-color: var(--superficie);
  flex: 1;
  display: flex;
  align-items: center;
  border-top: 0.2px solid var(--gris-claro);
}

.card-image {
  width: 100%;
  height: 7.6rem;
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
  padding: 0 0.45rem;
  color: var(--blanco);
  font-family: var(--fuente-titulo);
  font-size: 0.68rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.15;
}

@media (min-width: 768px) and (max-width: 1026px) {
  .card {
    width: 10rem;
    height: 13rem;
  }

  .card-image {
    height: 9.5rem;
  }

  .card h3 {
    font-size: 0.75rem;
    padding: 0 0.55rem;
  }
}

@media (max-width: 767px) {
  .card {
    width: min(82vw, 14rem);
    height: 16rem;
  }

  .card-image {
    height: 12rem;
  }

  .card h3 {
    font-size: 0.8rem;
    padding: 0 0.55rem;
  }
}
</style>
