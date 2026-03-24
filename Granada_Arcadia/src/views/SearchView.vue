<script>
import { searchCollections } from '@/services/api'
import { searchRecords } from '@/services/api'
export default {
  data() {
    return {
      search: null,
      scope: 'records',
      results: [],
    }
  },
  methods: {
    async searchFor() {
      if (this.scope == 'records') {
        let res = await searchRecords(this.search)
        this.results = res.map((item) => ({ ...item, type: 'record' }))
      } else if (this.scope == 'collections') {
        let res = await searchCollections(this.search)
        this.results = res.map((item) => ({ ...item, type: 'collection' }))
      } else {
        let results1 = await searchCollections(this.search)
        let results2 = await searchRecords(this.search)
        results1 = results1.map((item) => ({ ...item, type: 'collection' }))
        results2 = results2.map((item) => ({ ...item, type: 'record' }))
        this.results = results1.concat(results2)
      }
    },
  },
}
</script>

<template>
  <section>
    <input type="radio" v-model="scope" value="records" /> Registros
    <input type="radio" v-model="scope" value="collections" /> Colecciones
    <input type="radio" v-model="scope" value="all" /> Todo
    <input v-model="search" type="text" placeholder="Buscar..." />
    <button @click="searchFor">Buscar</button>
  </section>
  <section>
    <div class="enlace" v-for="result in results" :key="result.id">
      <router-link :to="`/${result.type}/${result.id}`">
        <img :src="'https://arcadium.cluster24.libnamic.eu' + result.thumbnail" alt="" />
        <h3>{{ result.title }}</h3>
      </router-link>
    </div>
  </section>
</template>
