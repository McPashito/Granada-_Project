<script setup>
defineProps({
  offset: {
    type: Number,
    required: true,
  },
  itemsLength: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 16,
  },
})
const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <section class="paginacion" v-if="itemsLength > 0">
    <button @click="emit('prev')" :disabled="offset === 0">Anterior</button>
    <h6>Página {{ offset / pageSize + 1 }}</h6>
    <button @click="emit('next')" :disabled="itemsLength < pageSize">Siguiente</button>
  </section>
</template>
<style>
.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--blanco);
  font-size: 2rem;
}

.paginacion button {
  background-color: var(--superficie);
  color: var(--blanco);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  cursor: pointer;
}

.paginacion h6 {
  color: var(--blanco);
  font-size: 2rem;
}

@media (max-width: 768px) {
  .paginacion {
    gap: 0.5rem !important;
    padding: 1rem !important;
  }

  .paginacion button {
    font-size: 1rem !important;
    padding: 0.4rem 0.8rem !important;
  }

  .paginacion h6 {
    font-size: 1rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1026px) {
  .paginacion {
    gap: 0.5rem !important;
    padding: 1rem !important;
  }

  .paginacion button {
    font-size: 1rem !important;
    padding: 0.4rem 0.8rem !important;
  }

  .paginacion h6 {
    font-size: 1rem !important;
  }
}
</style>
