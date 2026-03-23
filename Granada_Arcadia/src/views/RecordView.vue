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
  methods: {
    async loadMore() {
      this.offset += 16
      this.records = await getRecords(this.offset)
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16
        this.records = await getRecords(this.offset)
      }
    },
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="record in records" :key="record.id">
      <router-link :to="`/record/${record.id}`">
        <img :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail" alt="" />
        <h3>{{ record.title }}</h3>
      </router-link>
    </div>
  </section>
  <section class="paginacion">
    <button @click="loadLess" :disabled="offset < 16">Anterior</button>
    <h6>Página {{ offset / 16 + 1 }}</h6>
    <button @click="loadMore" :disabled="records.length < 16">Siguiente</button>
  </section>
</template>
