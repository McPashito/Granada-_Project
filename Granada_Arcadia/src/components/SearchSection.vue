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
  width: min(52rem, calc(100% - 2rem));
  margin: 0.7rem auto 0.45rem;
}

.search-section__group {
  display: grid;
  gap: 0.3rem;
  width: 100%;
}

.search-section__label {
  font-size: 0.58rem;
  color: var(--gris);
  letter-spacing: 0.08rem;
  margin-bottom: 0.18rem;
}

.search-section__input {
  font-size: 0.72rem;
  width: 100%;
  padding: 0.28rem 0.45rem;
  border-radius: 0.25rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
}

.search-section__button {
  font-size: 0.72rem;
  background-color: var(--primario);
  color: var(--oscuro);
  border: none;
  border-radius: 0.25rem;
  padding: 0.32rem 0.45rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

@media (max-width: 1026px) {
  .search-section {
    width: min(60rem, calc(100% - 2rem));
    margin: 1rem auto 0.75rem;
  }

  .search-section__group {
    gap: 0.4rem;
  }

  .search-section__label {
    font-size: 0.65rem;
    letter-spacing: 0.1rem;
    margin-bottom: 0.25rem;
  }

  .search-section__input {
    font-size: 0.8rem;
    padding: 0.35rem 0.55rem;
    border-radius: 0.3rem;
  }

  .search-section__button {
    font-size: 0.8rem;
    border-radius: 0.3rem;
    padding: 0.4rem 0.55rem;
  }
}
</style>
