<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchSection from '@/components/SearchSection.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getCollections, searchCollections } from '../services/api.js'
import { imageFormat } from '@/utils/imageFormat'

export default {
  components: {
    SearchSection,
    ItemCard,
    PaginationComponent,
  },
  data() {
    return {
      offset: 0,
      collections: [],
      searchText: '',
    }
  },
  async mounted() {
    this.collections = await getCollections(this.offset)
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.collections = await searchCollections(this.searchText, this.offset)
      } else {
        this.collections = await getCollections(this.offset)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.collections = await searchCollections(this.searchText, this.offset)
        } else {
          this.collections = await getCollections(this.offset)
        }
      }
    },
    async handlSearch(searchText) {
      this.searchText = searchText
      if (!searchText.trim()) {
        this.offset = 0
        this.collections = await getCollections(this.offset)
        return
      }

      this.offset = 0
      this.collections = await searchCollections(searchText, this.offset)
    },
    imageFormat,
  },
}
</script>

<template>
  <SearchSection @search="handlSearch" />

  <section class="card-grid">
    <ItemCard
      v-for="collection in collections"
      :key="collection.id"
      :title="collection.title"
      :image="collection.thumbnail ? imageFormat(collection.thumbnail, 'small') : null"
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
