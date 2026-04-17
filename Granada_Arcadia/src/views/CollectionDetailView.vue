<script>
import { getItemById, getRecordsFromCollection } from '@/services/api'
import { imageFormat } from '@/utils/imageFormat.js'
import ItemCard from '@/components/ItemCard.vue'
import DetailCard from '@/components/DetailCard.vue'

export default {
  components: {
    ItemCard,
    DetailCard,
  },
  data() {
    return {
      collection: null,
      records: [],
      entity: 'collection',
    }
  },
  async mounted() {
    this.collection = await getItemById(this.$route.params.id, this.entity)
    this.records = await getRecordsFromCollection({ collectionId: this.$route.params.id })
  },
  methods: {
    imageFormat,
  },
}
</script>

<template>
  <DetailCard
    v-if="collection"
    :image="collection?.thumbnail ? imageFormat(collection.thumbnail, 'large') : null"
    :title="collection.title"
    :date="collection.date"
    :description="collection.description"
  />

  <section class="card-grid" v-if="records.length > 0">
    <ItemCard
      v-for="record in records"
      :key="record.id"
      :title="record.title || 'Sin título'"
      :image="record.thumbnail || null"
      :to="`/record/${record.id}`"
    />
  </section>
</template>
