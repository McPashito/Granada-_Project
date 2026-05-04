<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchSection from '@/components/SearchSection.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getItem, searchQuick } from '../services/api.js'
import SearchInfo from '@/components/SearchInfo.vue'
import ItemCardList from '@/components/ItemCardList.vue'
import ChangingBar from '@/components/ChangingBar.vue'

const GRID_ROWS = 4

function getAvailableGridWidth(element) {
  if (!element) return 0

  const rect = element.getBoundingClientRect()
  const styles = window.getComputedStyle(element)
  const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0
  const paddingRight = Number.parseFloat(styles.paddingRight) || 0

  return Math.max(0, rect.width - paddingLeft - paddingRight)
}

function computePageSize(element) {
  const availableWidth = getAvailableGridWidth(element)

  if (!availableWidth) return 16

  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize,
  )
  const viewportWidth = window.innerWidth
  const isMobile = viewportWidth <= 767
  const isTablet = viewportWidth >= 768 && viewportWidth <= 1026
  const minCardRem = isMobile ? 11 : isTablet ? 10.5 : 11
  const gapRem = isMobile ? 0.85 : isTablet ? 0.85 : 0.9
  const minCardPx = minCardRem * (rootFontSize || 16)
  const gapPx = gapRem * (rootFontSize || 16)
  const columns = Math.max(1, Math.floor((availableWidth + gapPx) / (minCardPx + gapPx)))

  return Math.max(4, columns * GRID_ROWS)
}

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
      pageSize: 16,
      layoutObserver: null,
    }
  },

  async mounted() {
    const query = this.$route.query.q
    if (query) {
      this.searchText = query
      this.hasSearched = true
    }

    await this.$nextTick()
    this.pageSize = computePageSize(this.$refs.layoutRoot) || this.pageSize
    this.setupLayoutObserver()
    await this.loadCurrentPage()
  },
  beforeUnmount() {
    if (this.layoutObserver) {
      this.layoutObserver.disconnect()
      this.layoutObserver = null
    }
  },
  watch: {
    async '$route.query.q'(newQuery) {
      if (!newQuery) {
        this.searchText = ''
        this.hasSearched = false
        this.offset = 0
        await this.loadCurrentPage()
      }
    },
  },
  methods: {
    setupLayoutObserver() {
      const element = this.$refs.layoutRoot

      if (!element) return

      const update = async () => {
        const nextPageSize = computePageSize(element)

        if (nextPageSize !== this.pageSize) {
          const previousPageSize = this.pageSize
          const currentPage = Math.floor(this.offset / previousPageSize)
          this.pageSize = nextPageSize
          this.offset = currentPage * nextPageSize
          await this.loadCurrentPage()
        }
      }

      if (window.ResizeObserver) {
        this.layoutObserver = new ResizeObserver(() => {
          update()
        })
        this.layoutObserver.observe(element)
      } else {
        window.addEventListener('resize', update)
        this.layoutObserver = {
          disconnect() {
            window.removeEventListener('resize', update)
          },
        }
      }
    },
    async loadCurrentPage() {
      this.isLoading = true

      try {
        if (this.searchText.trim()) {
          this.collections = await searchQuick(
            this.searchText,
            this.offset,
            this.entity,
            this.pageSize,
          )
        } else {
          this.collections = await getItem(this.offset, this.entity, this.pageSize)
        }
      } catch (error) {
        console.error('Error loading collections:', error)
        this.collections = []
      } finally {
        this.isLoading = false
      }
    },
    async loadMore() {
      this.offset += this.pageSize
      await this.loadCurrentPage()
    },
    async loadLess() {
      if (this.offset >= this.pageSize) {
        this.offset -= this.pageSize
        await this.loadCurrentPage()
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

      this.hasSearched = true
      this.offset = 0

      if (query) {
        await this.loadCurrentPage()
        return
      }

      if (this.$route.query.q) {
        this.$router.push({ query: {} })
        return
      }

      await this.loadCurrentPage()
    },
    setView(view) {
      this.view = view
    },
  },
}
</script>

<template>
  <SearchSection @search="handleSearch" />
  <div class="collection-layout" ref="layoutRoot">
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
    :page-size="pageSize"
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
