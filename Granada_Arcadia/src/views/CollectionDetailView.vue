<script>
import { getCollectionById, getRecordsFromCollection } from '@/services/api'

export default {
  data() {
    return {
      collection: null,
      records: [],
    }
  },
  async mounted() {
    console.log(this.$route.params.id)
    this.collection = await getCollectionById(this.$route.params.id)
    this.records = await getRecordsFromCollection({ collectionId: this.$route.params.id })
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="record in records" :key="record.id">
      <h3>{{ record.metadata_fields['dcterms:title']?.[0]?.['@value'] }}</h3>
    </div>
  </section>
</template>
