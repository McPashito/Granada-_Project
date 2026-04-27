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
  gap: 0.35rem;
  padding: 0.4rem 0 0.7rem;
  color: var(--blanco);
  font-size: 0.72rem;
}

.paginacion button {
  background-color: var(--superficie);
  color: var(--blanco);
  border: none;
  border-radius: 0.28rem;
  padding: 0.25rem 0.55rem;
  font-size: 0.7rem;
  cursor: pointer;
}

.paginacion button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.paginacion h6 {
  color: var(--blanco);
  font-size: 0.72rem;
  font-weight: 500;
}

@media (max-width: 767px) {
  .paginacion {
    gap: 0.4rem;
    padding: 0.5rem 0 0.8rem;
  }

  .paginacion button {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }

  .paginacion h6 {
    font-size: 0.75rem;
  }
}

@media (min-width: 768px) and (max-width: 1026px) {
  .paginacion {
    gap: 0.45rem;
    padding: 0.55rem 0 0.9rem;
  }

  .paginacion button {
    font-size: 0.78rem;
    padding: 0.32rem 0.65rem;
  }

  .paginacion h6 {
    font-size: 0.78rem;
  }
}
</style>
