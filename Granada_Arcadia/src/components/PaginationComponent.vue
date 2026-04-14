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
