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
        <img v-if="image" :src="image" :alt="title" />
      </div>
      <h3>{{ title }}</h3>
    </RouterLink>
  </div>
</template>
