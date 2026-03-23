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
        <h3>{{ collection.metadata_fields['dcterms:title'][0]['@value'] }}</h3>
      </RouterLink>
    </div>
  </section>
</template>
