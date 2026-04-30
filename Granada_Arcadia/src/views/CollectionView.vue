<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchSection from '@/components/SearchSection.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getItem, searchQuick } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'
import ItemCardList from '@/components/ItemCardList.vue'
import ChangingBar from '@/components/ChangingBar.vue'

export default {
  components: {
    SearchSection,
    ItemCard,
    PaginationComponent,
    SearchInfo,
    ItemCardList,
    ChangingBar,
  },
  data() {
    return {
      entity: 'collection',
      offset: 0,
      collections: [],
      searchText: '',
      hasSearched: false,
      isLoading: false,
      view: 'grid',
    }
  },

  async mounted() {
    const query = this.$route.query.q
    if (query) {
      this.isLoading = true
      try {
        this.searchText = query
        this.hasSearched = true
        this.collections = await searchQuick(query, this.offset, this.entity)
      } finally {
        this.isLoading = false
      }
    } else {
      this.collections = await getItem(this.offset, this.entity)
    }
  },
  watch: {
    async '$route.query.q'(newQuery) {
      if (!newQuery) {
        this.searchText = ''
        this.hasSearched = false
        this.offset = 0
        this.collections = await getItem(this.offset, this.entity)
      }
    },
  },
  methods: {
    async loadMore() {
      this.offset += 16
      if (this.searchText.trim()) {
        this.collections = await searchQuick(this.searchText, this.offset, this.entity)
      } else {
        this.collections = await getItem(this.offset, this.entity)
      }
    },
    async loadLess() {
      if (this.offset >= 16) {
        this.offset -= 16

        if (this.searchText.trim()) {
          this.collections = await searchQuick(this.searchText, this.offset, this.entity)
        } else {
          this.collections = await getItem(this.offset, this.entity)
        }
      }
    },
    async handleSearch(searchText) {
      this.searchText = searchText

      const query = searchText.trim() /*jjj*/

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
          this.collections = await getItem(this.offset, this.entity)

          return
        } else {
          this.offset = 0
          this.collections = await searchQuick(this.searchText, this.offset, this.entity)
        }
      } catch (error) {
        console.error('Error searching collections:', error)
        this.collections = []
      } finally {
        this.isLoading = false
      }
    },
    setView(view) {
      this.view = view
    },
  },
}
</script>

<template>
  <SearchSection @search="handleSearch" />
  <div class="collection-layout">
    <ChangingBar :active-view="view" @change-view="setView" />
    <SearchInfo
      v-if="hasSearched"
      :results="collections"
      :isLoading="isLoading"
      :hasSearched="hasSearched"
    />
    <section class="card-grid" v-if="collections.length > 0 && view === 'grid'">
      <ItemCard
        v-for="collection in collections"
        :key="collection.id"
        :title="collection.title"
        :image="collection.thumbnail || null"
        :to="`/collection/${collection.id}`"
      />
    </section>
    <section class="card-list" v-if="collections.length > 0 && view === 'list'">
      <ItemCardList
        v-for="collection in collections"
        :key="collection.id"
        :title="collection.title"
        :image="collection.thumbnail || null"
        :to="`/collection/${collection.id}`"
      />
    </section>
  </div>
  <PaginationComponent
    :offset="offset"
    :itemsLength="collections.length"
    @prev="loadLess"
    @next="loadMore"
  />
</template>

<style>
.collection-layout {
  width: min(72rem, 100%);
  margin: 1.25rem auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.collection-layout .card-grid {
  width: 100%;
  margin: 0;
}

.card-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  margin: 0;
}

@media (max-width: 767px) {
  .collection-layout {
    width: 100%;
    padding: 0 1rem;
  }
}

@media (min-width: 768px) and (max-width: 1026px) {
  .collection-layout {
    width: min(60rem, 100%);
  }
}
</style>
