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
      <p v-if="author" class="card-author">Autor: {{ author }}</p>
    </div>
  </router-link>
</template>
<style scoped>
.cardList {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: inherit;
  background-color: var(--gris);
  border-color: none;
  border-radius: 4px;

  width: 100%;
  max-width: 100%;
  height: 70px;
  overflow: hidden;
  box-sizing: border-box;
  align-self: stretch;
}

.card-image-box {
  width: 20%;
  height: 100%;
  background-color: var(--superficie);

  flex-shrink: 0;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.card-content {
  flex: 1;
  height: 100%;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  background-color: var(--gris);
  min-width: 0;
}

.card-title {
  font-size: 12px;
  margin-bottom: 8px;

  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-author {
  font-size: 10px;
}
</style>
