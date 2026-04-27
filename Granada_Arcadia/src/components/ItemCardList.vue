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
  author: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <router-link :to="to" class="cardList">
    <img v-if="image" :src="image" alt="Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p v-if="author" class="card-author">{{ author }}</p>
    </div>
  </router-link>
</template>
<style scoped>
.cardList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--gris);

  transition: box-shadow 0.3s ease;
  width: 300px;
  height: 100px;
  overflow: hidden;
}

.cardList:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 30%;
  height: 100%;
  border-radius: 4px;
  object-fit: contain;
  background-color: var(--superficie);

  overflow: hidden;
}

.card-content {
  background-color: var(--gris);
  text-align: center;
}

.card-title {
  font-size: 1rem;
  margin-bottom: 8px;
}

.card-author {
  font-size: 0.9em;
  color: #555;
}
</style>
