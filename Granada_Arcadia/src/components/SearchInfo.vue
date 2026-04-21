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
  gap: 1rem;
  color: var(--gris);
  text-align: center;
  padding: 4rem;
}

.empty-icon {
  font-size: 3rem;
}

@media (min-width: 769px) and (max-width: 1025px) {
}

@media (max-width: 768px) {
}
</style>
