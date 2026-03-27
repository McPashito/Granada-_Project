<script>
import SearchSection from '@/components/SearchSection.vue'
import { getCollections, searchCollections } from '../services/api.js'

export default {
  components: {
    SearchSection,
  },
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    this.collections = await getCollections()
  },
  methods: {
    async searchRes(searchText) {
      if (!searchText.trim()) return
      this.collections = await searchCollections(searchText)
    },

    /*async searchRes(searchText) {
  if (!searchText.trim()) {
    this.collections = await getCollections()
    return
  }
  this.collections = await searchCollections(searchText)
}*/
  },
}
</script>

<template>
  <SearchSection @search="searchRes" />

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
