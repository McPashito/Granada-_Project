<script>
import { getRecordById } from '@/services/api'
export default {
  data() {
    return {
      record: null,
    }
  },
  async mounted() {
    this.record = await getRecordById(this.$route.params.id)
  },
  methods: {
    imageFormat(url, size) {
      return 'https://arcadium.cluster24.libnamic.eu' + url + '&size=' + size
    },
  },
}
</script>
<template>
  <section class="details" v-if="record">
    <div class="details-img">
      <img v-if="record.thumbnail" :src="imageFormat(record.thumbnail, 'large')" alt="" />
    </div>
    <div class="details-description">
      <h2>Título: {{ record.title }}</h2>
      <h2>Fecha: {{ record.date }}</h2>
      <h3>Descripcion: {{ record.description }}</h3>
    </div>
  </section>
</template>
