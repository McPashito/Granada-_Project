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
  <div v-for="collection in collections" :key="collection.name">
    <p>{{ collection.metadata_fields['dcterms:title'][0]['@value'] }}</p>
  </div>
</template>
