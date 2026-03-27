<script setup>
import { ref } from 'vue'

const search = ref('')

const emit = defineEmits(['search'])

function handleSearch() {
  if (!search.value.trim()) return
  emit('search', search.value)
}
</script>

<template>
  <div class="search-section">
    <div class="search-section__group">
      <p class="search-section__label">BÚSQUEDA RÁPIDA</p>
      <input
        class="search-section__input"
        v-model="search"
        type="text"
        placeholder="Buscar por título o autor..."
        @keyup.enter="handleSearch"
      />
      <button class="search-section__button" @click="handleSearch">EJECUTAR BÚSQUEDA</button>
    </div>
  </div>
</template>

<style scoped>
.search-section {
  margin: 3rem 0;
  max-width: 80%;
}

.search-section__input {
  font-size: 1.5rem;
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
}

.search-section__button {
  font-size: 1.5rem;
  background-color: var(--primario);
  color: var(--oscuro);
  border: none;
  border-radius: 0.4rem;
  padding: 0.8rem;

  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.search-section__label {
  font-size: 1rem;
  color: var(--gris);
  letter-spacing: 0.1rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 769px) {
  .search-section__group {
    margin: 2rem 1rem;
  }

  .search-section__input {
    font-size: 1rem;
  }

  .search-section__button {
    font-size: 1rem;
  }

  .search-section__label {
    font-size: 1rem;
  }
}
</style>
