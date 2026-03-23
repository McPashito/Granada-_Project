<script>
import { getCollectionById } from '@/services/api'

export default {
  data() {
    return {
      collection: null,
    }
  },
  async mounted() {
    this.collection = await getCollectionById(this.$route.params.id)
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-if="collection">
      <h3>{{ collection.metadata_fields['dcterms:title'][0]['@value'] }}</h3>
    </div>
  </section>
</template>
