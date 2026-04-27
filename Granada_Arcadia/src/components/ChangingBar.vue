<script setup>
defineProps({
  activeView: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['change-view'])
</script>
<template>
  <section class="changing-bar-container">
    <button
      class="button"
      :class="{ 'button--active': activeView === 'grid' }"
      @click="emit('change-view', 'grid')"
    >
      GRID
    </button>
    <button
      class="button"
      :class="{ 'button--active': activeView === 'list' }"
      @click="emit('change-view', 'list')"
    >
      LIST
    </button>
  </section>
</template>
<style>
.changing-bar-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  border: 0.25px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.28rem;
  background-color: var(--superficie);
  padding: 0.1rem;
  gap: 0.22rem;
  margin: 0;
}

.button {
  background-color: var(--primario);
  border-radius: 0.24rem;
  border-color: var(--dorado);
  font-size: 0.62rem;
  cursor: pointer;
  padding: 0.22rem 0.5rem;
  margin: 0;
}

.button--active {
  filter: brightness(1.08);
}
</style>
