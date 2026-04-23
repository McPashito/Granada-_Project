<script>
import ItemCard from '@/components/ItemCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import SearchSection from '@/components/SearchSection.vue'
import { getItem, searchQuick } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'

export default {
  components: {
    ItemCard,
    PaginationComponent,
    SearchSection,
    SearchInfo,
  },
  data() {
    return {
      entity: 'record',
      offset: 0,
      records: [],
      searchText: '',
      hasSearched: false,
      isLoading: false,
    }
  },
  async mounted() {
    const query = this.$route.query.q

    if (query) {
      this.isLoading = true
      try {
        this.searchText = query
        this.hasSearched = true
        this.records = await searchQuick(query, this.offset, this.entity)
      } finally {
        this.isLoading = false
      }
    } else {
      this.records = await getItem(this.offset, this.entity)
    }
  },
  watch: {
    async '$route.query.q'(newQuery) {
      if (!newQuery) {
        this.searchText = ''
        this.hasSearched = false
        this.offset = 0
        this.records = await getItem(this.offset, this.entity)
      }
    },
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.records = await searchQuick(this.searchText, this.offset, this.entity)
      } else {
        this.records = await getItem(this.offset, this.entity)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.records = await searchQuick(this.searchText, this.offset, this.entity)
        } else {
          this.records = await getItem(this.offset, this.entity)
        }
      }
    },
    async handleSearch(searchText) {
      this.searchText = searchText

      const query = searchText.trim()

      if (query) {
        this.$router.push({ query: { q: query } })
      } else {
        this.$router.push({ query: {} })
      }
      if (this.isLoading) return

      this.isLoading = true
      this.hasSearched = true
      try {
        if (!searchText.trim()) {
          this.offset = 0
          this.records = await getItem(this.offset, this.entity)

          return
        } else {
          this.offset = 0
          this.records = await searchQuick(this.searchText, this.offset, this.entity)
        }
      } catch (error) {
        console.error('Error searching records:', error)
        this.records = []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <SearchSection @search="handleSearch" />
  <SearchInfo
    v-if="hasSearched"
    :results="records"
    :isLoading="isLoading"
    :hasSearched="hasSearched"
  />
  <section class="card-grid" v-if="records.length > 0">
    <ItemCard
      v-for="record in records"
      :key="record.id"
      :title="record.title || 'Sin título'"
      :image="record.thumbnail || null"
      :to="`/record/${record.id}`"
    />
  </section>
  <PaginationComponent
    :offset="offset"
    :itemsLength="records.length"
    @prev="loadLess"
    @next="loadMore"
  />
</template>
