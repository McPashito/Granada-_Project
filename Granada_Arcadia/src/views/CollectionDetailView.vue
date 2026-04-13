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
  methods: {
    imageFormat(url, size) {
      return 'https://arcadium.cluster24.libnamic.eu' + url + '&size=' + size
    },
  },
}
</script>

<template>
  <section class="details" v-if="collection">
    <div class="details-img">
      <img v-if="collection.thumbnail" :src="imageFormat(collection.thumbnail, 'large')" alt="" />
    </div>
    <div class="details-description">
      <h2>Título: {{ collection.title }}</h2>
      <h2>Fecha: {{ collection.date }}</h2>
      <h3>Descripcion: {{ collection.description }}</h3>
    </div>
  </section>

  <section class="card-grid">
    <div class="card" v-for="record in records" :key="record.id">
      <router-link :to="`/record/${record.id}`">
        <div class="card-image">
          <img v-if="record.thumbnail" :src="imageFormat(record.thumbnail, 'small')" alt="" />
        </div>

        <h3>{{ record.title }}</h3>
      </router-link>
    </div>
  </section>
</template>
