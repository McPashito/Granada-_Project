<script>
import { getCollections, searchCollections } from '../services/api.js'

export default {
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    this.collections = await getCollections()
  },
  methods: {
    async searchRes() {
      this.collections = await searchCollections(this.search)
    },
  },
}
</script>

<template>
  <div class="search-group">
    <p class="search-label">BÚSQUEDA RÁPIDA</p>
    <input
      class="search-input"
      v-model="search"
      type="text"
      placeholder="Buscar por título o autor..."
      @keyup.enter="searchRes"
    />
    <button class="search-btn" @click="searchRes">EJECUTAR BÚSQUEDA</button>
  </div>

  <section class="cuadro">
    <div class="enlace" v-for="collection in collections" :key="collection.id">
      <RouterLink :to="`/collection/${collection.id}`">
        <img
          v-if="collection.thumbnail"
          :src="'https://arcadium.cluster24.libnamic.eu' + collection.thumbnail"
          alt=""
        />
        <h3>{{ collection.title }}</h3>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
.search-group {
  margin: 3rem 0;
  font-size: 1.5rem;
}

.search-input {
  font-size: 1.5rem;
}

.search-btn {
  font-size: 1.5rem;
}

.search-label {
  font-size: 1rem;
}
@media (max-width: 769px) {
  .search-group {
    margin: 2rem 1rem;
    font-size: 0.2rem;
  }

  .search-input {
    font-size: 1rem;
  }

  .search-btn {
    font-size: 1rem;
  }

  .search-label {
    font-size: 1rem;
  }
}
</style>
