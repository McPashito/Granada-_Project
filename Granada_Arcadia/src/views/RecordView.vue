<script>
import { getRecords } from '../services/api.js'

export default {
  data() {
    return {
      records: [],
    }
  },
  async mounted() {
    this.records = await getRecords()
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="record in records" :key="record.name">
      <h3>{{ record.metadata_fields['dcterms:title']?.[0]?.['@value'] }}</h3>
    </div>
  </section>
</template>
