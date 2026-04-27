<script>
import ItemCard from '@/components/ItemCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import SearchSection from '@/components/SearchSection.vue'
import { getItem, searchQuick } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'
import ItemCardList from '@/components/ItemCardList.vue'

export default {
  components: {
    ItemCard,
    PaginationComponent,
    SearchSection,
    SearchInfo,
    ItemCardList,
  },
  data() {
    return {
      entity: 'record',
      offset: 0,
      records: [],
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
    async viewGrid() {
      this.view = 'grid'
    },
    async viewList() {
      this.view = 'list'
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
  <section class="changing-bar-container">
    <button class="button" @click="viewGrid">GRID</button>
    <button class="button" @click="viewList">LIST</button>
  </section>
  <section class="card-grid" v-if="records.length > 0 && view === 'grid'">
    <ItemCard
      v-for="record in records"
      :key="record.id"
      :title="record.title || 'Sin título'"
      :image="record.thumbnail || null"
      :to="`/record/${record.id}`"
    />
  </section>
  <section class="card-list" v-if="records.length > 0 && view === 'list'">
    <ItemCardList
      v-for="record in records"
      :key="record.id"
      :title="record.title || 'Sin título'"
      :image="record.thumbnail || null"
      :to="`/record/${record.id}`"
      :author="record.author || ''"
    />
  </section>

  <PaginationComponent
    :offset="offset"
    :itemsLength="records.length"
    @prev="loadLess"
    @next="loadMore"
  />
</template>
<style>
.changing-bar-container {
  width: min(34rem, 100%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  border: 0.25px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.28rem;
  background-color: var(--superficie);
  padding: 0.1rem;
  gap: 0.22rem;
  margin: 0 auto 0.35rem;
}

.button {
  background-color: var(--primario);
  border-radius: 0.24rem;
  border-color: var(--dorado);
  font-size: 0.62rem;
  cursor: pointer;
  padding: 0.22rem 0.5rem;
  margin: 0;
}

@media (max-width: 767px) {
  .changing-bar-container {
    width: 92%;
  }
}

@media (min-width: 768px) and (max-width: 1026px) {
  .changing-bar-container {
    width: min(22rem, 100%);
  }
}
</style>
