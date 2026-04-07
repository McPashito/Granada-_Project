<script>
import SearchSection from '@/components/SearchSection.vue'
import { getCollections, searchCollections } from '../services/api.js'

export default {
  components: {
    SearchSection,
  },
  data() {
    return {
      offset: 0,
      collections: [],
      searchText: '',
    }
  },
  async mounted() {
    this.collections = await getCollections(this.offset)
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.collections = await searchCollections(this.searchText, this.offset)
      } else {
        this.collections = await getCollections(this.offset)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.collections = await searchCollections(this.searchText, this.offset)
        } else {
          this.collections = await getCollections(this.offset)
        }
      }
    },
    async handlSearch(searchText) {
      this.searchText = searchText
      if (!searchText.trim()) {
        this.offset = 0
        this.collections = await getCollections(this.offset)
        return
      }

      this.offset = 0
      this.collections = await searchCollections(searchText, this.offset)
    },
  },
}
</script>

<template>
  <SearchSection @search="handlSearch" />

  <section class="card-grid">
    <div class="card" v-for="collection in collections" :key="collection.id">
      <RouterLink :to="`/collection/${collection.id}`">
        <div class="card-image">
          <img
            v-if="collection.thumbnail"
            :src="'https://arcadium.cluster24.libnamic.eu' + collection.thumbnail"
            alt=""
          />
        </div>

        <h3>{{ collection.title }}</h3>
      </RouterLink>
    </div>
  </section>
  <section class="paginacion" v-if="collections.length > 0">
    <button @click="loadLess" :disabled="offset < 16">Anterior</button>
    <h6>Página {{ offset / 16 + 1 }}</h6>
    <button @click="loadMore" :disabled="collections.length < 16">Siguiente</button>
  </section>
</template>
