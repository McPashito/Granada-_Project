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
}
</script>
<template>
  <section class="details" v-if="record">
    <div class="details-img">
      <img
        v-if="record.thumbnail"
        :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail"
        alt=""
      />
    </div>
    <div class="details-description">
      <h2>Título: {{ record.title }}</h2>
      <h2>Fecha: {{ record.date }}</h2>
      <h3>Descripcion: {{ record.description }}</h3>
    </div>
  </section>
</template>
