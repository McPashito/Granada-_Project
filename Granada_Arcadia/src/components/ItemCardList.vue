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
    <div class="card-image-box">
      <img v-if="image" :src="image" alt="Image" class="card-image" />
    </div>
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

  border-radius: 4px;
  background-color: var(--gris);

  border-color: var(--dorado);

  width: 300px;
  height: 100px;
  overflow: hidden;
  border-style: ridge;
}

.card-image-box {
  width: 30%;
  height: 100%;
  background-color: var(--superficie);
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card-content {
  display: flex;
  padding: 0 0 0 3px;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--gris);
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.15;
}

.card-title {
  font-size: 1rem;
  margin-bottom: 8px;
}

.card-author {
  font-size: 0.9em;
}
</style>
