<script>
import { getCollectionById, getRecordsFromCollection } from '@/services/api'
import { imageFormat } from '@/utils/imageFormat'
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
    }
  },
  async mounted() {
    console.log(this.$route.params.id)
    this.collection = await getCollectionById(this.$route.params.id)
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
    :key="collection.id"
    :image="collection?.thumbnail ? imageFormat(collection.thumbnail, 'large') : null"
    :title="collection.title"
    :date="collection.date"
    :description="collection.description"
  />

  <section class="card-grid" v-if="records.length > 0">
    <ItemCard
      v-for="record in records"
      :key="record.id"
      :title="record.title"
      :image="record.thumbnail ? imageFormat(record.thumbnail, 'small') : null"
      :to="`/record/${record.id}`"
    />
  </section>
</template>
