<script>
import { getRecords, searchRecords } from '../services/api.js'

export default {
  data() {
    return {
      offset: 0,
      records: [],
      search: '',
      busqueda: 'Buscar por título o autor...',
    }
  },
  async mounted() {
    this.records = await getRecords(this.offset)
  },
  methods: {
    async loadMore() {
      this.offset += 16
      this.records = await getRecords(this.offset)
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16
        this.records = await getRecords(this.offset)
      }
    },
    async searchRes() {
      this.records = await searchRecords(this.search)
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
      @keypress.enter="searchRes"
    />
    <button class="search-btn" @click="searchRes">EJECUTAR BÚSQUEDA</button>
  </div>

  <section class="cuadro">
    <div class="enlace" v-for="record in records" :key="record.id">
      <router-link :to="`/record/${record.id}`">
        <img
          v-if="record.thumbnail"
          :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail"
          alt=""
        />
        <h3>{{ record.title }}</h3>
      </router-link>
    </div>
  </section>
  <section class="paginacion" v-if="records.length >= 16">
    <button @click="loadLess" :disabled="offset < 16">Anterior</button>
    <h6>Página {{ offset / 16 + 1 }}</h6>
    <button @click="loadMore" :disabled="records.length < 16">Siguiente</button>
  </section>
</template>
<style scoped>
.search-group {
  margin: 3rem 0;
  font-size: 1.5rem;
  max-width: 80%;
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
