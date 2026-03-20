<script>
import { getRecords } from '../services/api.js'

export default {
  data() {
    return {
      offset: 0,
      records: [],
    }
  },
  async mounted() {
    this.records = await getRecords(this.offset)
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="record in records" :key="record.id">
      <router-link :to="{ name: 'recordid', params: { id: record.id } }">
        <h3>{{ record.metadata_fields['dcterms:title']?.[0]?.['@value'] }}</h3>
      </router-link>
    </div>
  </section>
</template>
