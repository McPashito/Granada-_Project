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

    console.log(this.collection.canonical_joined_metadata)
    console.log(this.collection.joined_metadata)
    this.records = await getRecordsFromCollection({ collectionId: this.$route.params.id })
  },
  methods: {
    imageFormat,
  },
}
</script>

<template>
  <section class="collection-detail">
    <h1>
      Detalles de la coleccion "{{
        collection?.canonical_joined_metadata?.title?.values?.[0]?.['@value']
      }}"
    </h1>
    <DetailCard
      v-if="collection"
      :image="collection?.thumbnail ? imageFormat(collection.thumbnail, 'large') : null"
      :title="collection?.canonical_joined_metadata?.title?.values?.[0]?.['@value'] || ''"
      :date="collection?.canonical_joined_metadata?.date?.values?.[0]?.['@value'] || ''"
      :description="
        collection?.canonical_joined_metadata?.description?.values?.[0]?.['@value'] || ''
      "
    />
    <h1>
      Registros incluidos en la coleccion "{{
        collection?.canonical_joined_metadata?.title?.values?.[0]?.['@value']
      }}"
    </h1>

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
  gap: 1rem;
  padding: 1rem;
  font-family: var(--fuente-titulo);
  font-size: clamp(1rem, 2vw, 1.35rem);
}
.collection-detail h1 {
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
}
</style>
