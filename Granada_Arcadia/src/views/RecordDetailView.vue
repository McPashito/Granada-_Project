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
  <section class="cuadro">
    <div class="enlace" v-if="record">
      <h3>{{ record.metadata_fields['dcterms:title']?.[0]?.['@value'] }}</h3>
      <h2>{{ record.metadata_fields['dcterms:creator']?.[0]?.['@value'] }}</h2>
      <h2>{{ record.metadata_fields['dcterms:date']?.[0]?.['@value'] }}</h2>
    </div>
  </section>
</template>
