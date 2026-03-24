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
      <router-link :to="`/record/${record.id}`">
        <img
          v-if="collection.thumbnail"
          :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail"
          alt=""
        />
        <h3>{{ record.title }}</h3>
      </router-link>
    </div>
  </section>
</template>
