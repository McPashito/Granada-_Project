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
  <section class="collection-detail">
    <h1>Detalles de la coleccion "{{ collection?.title }}"</h1>
    <DetailCard
      v-if="collection"
      :image="collection?.thumbnail ? imageFormat(collection.thumbnail, 'large') : null"
      :title="collection.title"
      :date="collection.date"
      :description="collection.description"
    />
    <h1>Registros incluidos en la coleccion "{{ collection?.title }}"</h1>

    <section class="card-grid" v-if="records.length > 0">
      <ItemCard
        v-for="record in records"
        :key="record.id"
        :title="record.title || 'Sin título'"
        :image="record.thumbnail || null"
        :to="`/record/${record.id}`"
      />
    </section>
  </section>
</template>
<style>
.collection-detail {
  display: flex;
  flex-direction: column;
  align-items: right;
  gap: 2rem;
  padding: 2rem;
}
.collection-detail h1 {
  font-size: 3rem;
}
</style>
