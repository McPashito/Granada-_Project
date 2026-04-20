<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchSection from '@/components/SearchSection.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getItem, searchCollections } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'

export default {
  components: {
    SearchSection,
    ItemCard,
    PaginationComponent,
    SearchInfo,
  },
  data() {
    return {
      entity: 'collection',
      offset: 0,
      collections: [],
      searchText: '',
      hasSearched: false,
      isLoading: false,
    }
  },

  async mounted() {
    this.collections = await getItem(this.offset, this.entity)
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.collections = await searchCollections(this.searchText, this.offset)
      } else {
        this.collections = await getItem(this.offset, this.entity)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.collections = await searchCollections(this.searchText, this.offset)
        } else {
          this.collections = await getItem(this.offset, this.entity)
        }
      }
    },
    async handleSearch(searchText) {
      this.searchText = searchText
      if (this.isLoading) return

      this.isLoading = true
      this.hasSearched = true
      try {
        if (!searchText.trim()) {
          this.offset = 0
          this.collections = await getItem(this.offset, this.entity)

          return
        } else {
          this.offset = 0
          this.collections = await searchCollections(this.searchText, this.offset)
        }
      } catch (error) {
        console.error('Error searching collections:', error)
        this.collections = []
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
    :results="collections"
    :isLoading="isLoading"
    :hasSearched="hasSearched"
  />

  <section class="card-grid" v-if="collections.length > 0">
    <ItemCard
      v-for="collection in collections"
      :key="collection.id"
      :title="collection.title"
      :image="collection.thumbnail || null"
      :to="`/collection/${collection.id}`"
    />
  </section>
  <PaginationComponent
    :offset="offset"
    :itemsLength="collections.length"
    @prev="loadLess"
    @next="loadMore"
  />
</template>
