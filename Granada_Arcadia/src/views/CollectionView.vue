<script>
import { getCollections } from '../services/api.js'

export default {
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    this.collections = await getCollections()
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="collection in collections" :key="collection.id">
      <RouterLink :to="`/collection/${collection.id}`">
        <img :src="'https://arcadium.cluster24.libnamic.eu' + collection.thumbnail" alt="" />
        <h3>{{ collection.title }}</h3>
      </RouterLink>
    </div>
  </section>
</template>
