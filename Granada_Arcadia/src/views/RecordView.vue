<script>
import ItemCard from '@/components/ItemCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import SearchSection from '@/components/SearchSection.vue'
import { getItem, searchQuick } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'
import ItemCardList from '@/components/ItemCardList.vue'
import ChangingBar from '@/components/ChangingBar.vue'

export default {
  components: {
    ItemCard,
    PaginationComponent,
    SearchSection,
    SearchInfo,
    ItemCardList,
    ChangingBar,
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
    setView(view) {
      this.view = view
    },
  },
}
</script>

<template>
  <SearchSection @search="handleSearch" />

  <div class="record-layout">
    <ChangingBar :active-view="view" @change-view="setView" />
    <SearchInfo
      v-if="hasSearched"
      :results="records"
      :isLoading="isLoading"
      :hasSearched="hasSearched"
    />
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
  </div>

  <PaginationComponent
    :offset="offset"
    :itemsLength="records.length"
    @prev="loadLess"
    @next="loadMore"
  />
</template>

<style>
.record-layout {
  width: min(34rem, 100%);
  margin: 1.25rem 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.record-layout .card-grid {
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
  .record-layout {
    width: 92%;
  }
}

@media (min-width: 768px) and (max-width: 1026px) {
  .record-layout {
    width: min(22rem, 100%);
  }
}
</style>
