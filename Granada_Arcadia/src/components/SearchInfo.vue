<script setup>
defineProps({
  results: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
  },
  hasSearched: {
    type: Boolean,
  },
})
</script>

<template>
  <div v-if="!hasSearched" class="empty-state">
    <span class="empty-icon">🔍</span>
    <h3>Sistema de Búsqueda</h3>
    <p>Configura los parámetros y ejecuta la búsqueda para ver resultados.</p>
  </div>
  <div v-else-if="isLoading" class="empty-state">
    <span class="empty-icon">⏳</span>
    <h3>Buscando...</h3>
    <p>Espere mientras se realiza la búsqueda</p>
  </div>
  <div v-else-if="results.length === 0" class="empty-state">
    <span class="empty-icon">❌</span>
    <h3>Sin resultados</h3>
    <p>Los parámetros de búsqueda que has introducido no produjeron ningún resultado</p>
  </div>
</template>
<style>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  color: var(--gris);
  text-align: center;
  padding: 1.5rem;
}

.empty-icon {
  font-size: 1.7rem;
}

.empty-state h3 {
  font-size: 0.95rem;
}

.empty-state p {
  font-size: 0.78rem;
  line-height: 1.45;
}

@media (min-width: 769px) and (max-width: 1025px) {
  .empty-state {
    gap: 1rem;
    padding: 4rem;
  }

  .empty-icon {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .empty-state {
    gap: 1rem;
    padding: 4rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }
}
</style>
