<script>
import ItemCard from '@/components/ItemCard.vue'
import SearchInfo from '@/components/SearchInfo.vue'
import { searchAdvanced } from '@/services/api'

export default {
  components: {
    ItemCard,
    SearchInfo,
  },
  data() {
    return {
      search: '',
      scope: 'records',
      selectedOperator: 'and',
      results: [],
      filters: [{ field: '', value: '' }],
      hasSearched: false,
      isLoading: false,
    }
  },
  methods: {
    addFilter() {
      this.filters.push({ field: '', value: '' })
    },
    removeFilter(index) {
      this.filters.splice(index, 1)
    },

    async handleSearch() {
      if (this.isLoading) return

      this.isLoading = true
      this.hasSearched = true

      const hasValidFilters = this.filters.some(
        (filter) => filter.field && String(filter.value).trim(),
      )

      if (!this.search.trim() && !hasValidFilters) {
        this.results = []
        this.isLoading = false
        return
      }

      try {
        if (this.scope === 'all') {
          const [records, collections] = await Promise.all([
            searchAdvanced('records', this.search, this.filters, this.selectedOperator),
            searchAdvanced('collections', this.search, this.filters, this.selectedOperator),
          ])

          this.results = [
            ...records.map((record) => ({ ...record, type: 'record' })),
            ...collections.map((collection) => ({ ...collection, type: 'collection' })),
          ]
        } else {
          const foundItems = await searchAdvanced(
            this.scope,
            this.search,
            this.filters,
            this.selectedOperator,
          )

          this.results = foundItems.map((item) => ({
            ...item,
            type: this.scope === 'records' ? 'record' : 'collection',
          }))
        }
      } catch (error) {
        console.error('Error en la búsqueda:', error)
        this.results = []
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<template>
  <div class="search-wrapper">
    <section class="search-panel">
      <h2 class="search-title">¿Qué deseas buscar?</h2>

      <form @submit.prevent="handleSearch">
        <div class="scope-buttons">
          <label :class="['scope-btn', scope === 'records' ? 'active' : '']">
            <input type="radio" v-model="scope" value="records" hidden />
            Registros
          </label>
          <label :class="['scope-btn', scope === 'collections' ? 'active' : '']">
            <input type="radio" v-model="scope" value="collections" hidden />
            Colecciones
          </label>
          <label :class="['scope-btn', scope === 'all' ? 'active' : '']">
            <input type="radio" v-model="scope" value="all" hidden />
            Todo
          </label>
        </div>

        <div class="search-group">
          <p class="search-label">BÚSQUEDA RÁPIDA</p>
          <div class="search-input-row">
            <input
              class="search-input"
              v-model="search"
              type="search"
              placeholder="Buscar por título o autor..."
              enterkeyhint="search"
              autocapitalize="none"
              autocomplete="off"
              spellcheck="false"
            />
            <button class="search-btn" type="submit" :disabled="isLoading">
              {{ isLoading ? 'Buscando...' : 'Buscar' }}
            </button>
          </div>
        </div>

        <div class="filters-group">
          <p class="search-label">SELECCIONA OPERADOR</p>
          <select class="filter-select" v-model="selectedOperator">
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>

          <p class="search-label">FILTROS ESPECÍFICOS</p>
          <div class="filter-row" v-for="(filter, index) in filters" :key="index">
            <select class="filter-select" v-model="filter.field">
              <option value="">Campo</option>
              <option value="title">Título</option>
              <option value="author">Autor</option>
              <option value="date">Año</option>
            </select>
            <input
              class="filter-input"
              v-model="filter.value"
              type="search"
              placeholder="Término de búsqueda"
              enterkeyhint="search"
            />
            <button
              class="filter-remove"
              type="button"
              v-if="filters.length > 1"
              @click="removeFilter(index)"
            >
              ✕
            </button>
          </div>

          <button class="add-filter" type="button" @click="addFilter">
            + Añadir parámetro adicional
          </button>
        </div>
      </form>
    </section>

    <section class="results-panel">
      <SearchInfo :results="results" :isLoading="isLoading" :hasSearched="hasSearched" />
      <div class="results-panel-records">
        <h1 v-if="results.some((result) => result.type === 'record')">
          Resultados que coinciden con registros:
        </h1>
        <div class="card-grid" v-if="results.some((result) => result.type === 'record')">
          <ItemCard
            v-for="result in results.filter((result) => result.type === 'record')"
            :key="result.id"
            :title="result.title"
            :image="result.thumbnail || null"
            :to="`/record/${result.id}`"
          />
        </div>
      </div>
      <div class="results-panel-collections">
        <h1 v-if="results.some((result) => result.type === 'collection')">
          Resultados que coinciden con colecciones:
        </h1>
        <div class="card-grid" v-if="results.some((result) => result.type === 'collection')">
          <ItemCard
            v-for="result in results.filter((result) => result.type === 'collection')"
            :key="result.id"
            :title="result.title"
            :image="result.thumbnail || null"
            :to="`/collection/${result.id}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 8rem);
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  justify-content: center;
  justify-items: center;
}
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  min-height: 65vh;
}

.search-panel {
  background-color: var(--superficie);
  border-radius: 0.55rem;
  padding: 1.15rem;
  width: 100%;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.search-panel form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.search-title {
  color: var(--blanco);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
}

.scope-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.scope-btn {
  display: block;
  padding: 0.38rem 0.65rem;
  border-radius: 0.3rem;
  color: var(--blanco);
  cursor: pointer;
  border: 1px solid var(--gris);
  font-size: 0.76rem;
}

.scope-btn.active {
  background-color: var(--primario);
  color: var(--oscuro);
  border-color: var(--primario);
  font-weight: bold;
}

.search-label {
  color: var(--gris);
  font-size: 0.62rem;
  letter-spacing: 0.08rem;
  margin-bottom: 0.3rem;
}

.search-group {
  display: flex;
  flex-direction: column;
}

.search-input-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 6.8rem;
  gap: 0.45rem;
  align-items: stretch;
}

.search-input {
  width: 100%;
  padding: 0.38rem 0.6rem;
  border-radius: 0.3rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 0.76rem;
  appearance: none;
  -webkit-appearance: none;
}

.search-input::placeholder,
.filter-input::placeholder {
  color: var(--gris);
}

.filters-group {
  display: flex;
  flex-direction: column;
}

.filter-row {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
  align-items: center;
}

.filter-select {
  padding: 0.38rem;
  border-radius: 0.3rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 0.76rem;
}

.filter-input {
  flex: 1;
  padding: 0.38rem;
  border-radius: 0.3rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 0.76rem;
}

.filter-remove {
  background: none;
  border: none;
  color: var(--gris);
  cursor: pointer;
  font-size: 0.8rem;
  min-width: 1.45rem;
  min-height: 1.45rem;
}

.add-filter {
  background: none;
  border: none;
  color: var(--primario);
  cursor: pointer;
  font-size: 0.72rem;
  padding: 0;
  text-align: left;
  margin-top: 0.15rem;
}

.search-btn {
  background-color: var(--primario);
  color: var(--oscuro);
  border: none;
  border-radius: 0.3rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.76rem;
  font-weight: bold;
  cursor: pointer;
  min-height: 2rem;
  width: 100%;
  min-width: 6.8rem;
  white-space: nowrap;
}

.search-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.results-panel {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.25rem;
  justify-content: center;
}

.results-panel h1 {
  font-size: 1rem;
  margin: 0 0 0.5rem;
  color: var(--blanco);
}

@media (min-width: 769px) and (max-width: 1025px) {
  .card-grid {
    grid-template-columns: repeat(2, 10rem);
    gap: 0.75rem;
    padding: 0.75rem 0;
  }

  .search-panel {
    max-width: min(800px, 94vw);
  }

  .results-panel {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem 0;
  }

  .results-panel {
    display: flex;
    flex-direction: column;
  }

  .search-panel {
    padding: 1rem;
    gap: 1rem;
  }

  .scope-buttons {
    flex-direction: column;
  }

  .search-input-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .search-btn {
    width: 100%;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    border-bottom: 1px solid var(--gris);
    padding-bottom: 1rem;
  }

  .filter-select,
  .filter-input {
    width: 100%;
  }

  .filter-remove {
    align-self: flex-end;
  }
}

@media (max-width: 1025px) {
  .search-wrapper {
    padding: 1.5rem;
    gap: 1.5rem;
    min-height: 80vh;
  }

  .search-panel form {
    gap: 1.5rem;
  }

  .search-input-row {
    grid-template-columns: minmax(0, 1fr) 8rem;
  }

  .search-title {
    font-size: 1rem;
    letter-spacing: 0.1rem;
  }

  .scope-btn {
    padding: 0.6rem 1rem;
    border-radius: 0.4rem;
    font-size: 1rem;
  }

  .search-label {
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    margin-bottom: 0.5rem;
  }

  .search-input,
  .filter-select,
  .filter-input {
    padding: 0.6rem;
    border-radius: 0.4rem;
    font-size: 1rem;
  }

  .search-input {
    padding: 0.6rem 1rem;
  }

  .search-btn {
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    min-height: 44px;
    min-width: 0;
  }

  .filter-remove {
    font-size: 1rem;
    min-width: 2rem;
    min-height: 2rem;
  }

  .add-filter {
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
}
</style>
