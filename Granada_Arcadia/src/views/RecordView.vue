<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchSection from '@/components/SearchSection.vue'
import { getRecords, searchRecords } from '../services/api.js'
import { imageFormat } from '@/utils/imageFormat'

export default {
  components: {
    ItemCard,
    SearchSection,
  },
  data() {
    return {
      offset: 0,
      records: [],
      searchText: '',
    }
  },
  async mounted() {
    this.records = await getRecords(this.offset)
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.records = await searchRecords(this.searchText, this.offset)
      } else {
        this.records = await getRecords(this.offset)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.records = await searchRecords(this.searchText, this.offset)
        } else {
          this.records = await getRecords(this.offset)
        }
      }
    },
    async handleSearch(searchText) {
      this.searchText = searchText
      if (!searchText.trim()) {
        this.offset = 0
        this.records = await getRecords(this.offset)
        return
      }

      this.offset = 0
      this.records = await searchRecords(searchText, this.offset)
    },
    imageFormat,
  },
}
</script>

<template>
  <SearchSection @search="handleSearch" />
  <section class="card-grid">
    <ItemCard
      v-for="record in records"
      :key="record.id"
      :title="record.title"
      :image="record.thumbnail ? imageFormat(record.thumbnail, 'small') : null"
      :to="`/record/${record.id}`"
    />
  </section>
  <section class="paginacion" v-if="records.length > 0">
    <button @click="loadLess" :disabled="offset < 16">Anterior</button>
    <h6>Página {{ offset / 16 + 1 }}</h6>
    <button @click="loadMore" :disabled="records.length < 16">Siguiente</button>
  </section>
</template>
