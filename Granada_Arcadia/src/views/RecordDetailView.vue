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
  <section class="cuadro" v-if="record">
    <div class="enlace">
      <img
        v-if="record.thumbnail"
        :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail"
        alt=""
      />
      <h3>{{ record.title }}</h3>
      <h2>{{ record.creator }}</h2>
      <h2>{{ record.date }}</h2>
    </div>
    <div class="descripcion" v-if="record">
      <h4>Descripcion:</h4>
      <p>{{ record.description }}</p>
    </div>
  </section>
</template>
