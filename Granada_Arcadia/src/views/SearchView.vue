<script>
import { searchAdvanced } from '@/services/api'

export default {
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
      this.isLoading = true
      this.hasSearched = true
      const hasValidFilters = this.filters.some((filter) => filter.field && filter.value)

      if (!this.search.trim() && !hasValidFilters) {
        this.isLoading = false
        this.results = []

        return
      }
      if (this.scope === 'all') {
        const records = await searchAdvanced(
          'records',
          this.search,
          this.filters,
          this.selectedOperator,
        )
        const collections = await searchAdvanced(
          'collections',
          this.search,
          this.filters,
          this.selectedOperator,
        )
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
      this.isLoading = false
    },
  },
}
</script>

<template>
  <div class="search-wrapper">
    <section class="search-panel">
      <h2 class="search-title">¿Qué deseas buscar?</h2>

      <div class="scope-buttons">
        <label :class="['scope-btn', scope === 'records' ? 'active' : '']">
          <input type="radio" v-model="scope" value="records" hidden /> Registros
        </label>
        <label :class="['scope-btn', scope === 'collections' ? 'active' : '']">
          <input type="radio" v-model="scope" value="collections" hidden /> Colecciones
        </label>
        <label :class="['scope-btn', scope === 'all' ? 'active' : '']">
          <input type="radio" v-model="scope" value="all" hidden /> Todo
        </label>
      </div>

      <div class="search-group">
        <p class="search-label">BÚSQUEDA RÁPIDA</p>
        <input
          class="search-input"
          v-model="search"
          type="text"
          placeholder="Buscar por título o autor..."
          @keyup.enter="handleSearch"
        />
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
            type="text"
            placeholder="Término de búsqueda"
            @keyup.enter="handleSearch"
          />
          <button class="filter-remove" v-if="filters.length > 1" @click="removeFilter(index)">
            ✕
          </button>
        </div>

        <button class="add-filter" @click="addFilter">+ Añadir parámetro adicional</button>
      </div>
    </section>

    <section class="results-panel">
      <div v-if="!hasSearched" class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>Sistema de Búsqueda</h3>
        <p>Configura los parámetros y ejecuta la búsqueda para ver resultados.</p>
      </div>
      <div v-else-if="isLoading" class="empty-state">
        <span class="empty-icon">⏳</span>
        <h3>Buscando...</h3>
        <p>Espere mientras se realiza la busqueda</p>
      </div>
      <div v-else-if="results.length === 0" class="empty-state">
        <span class="empty-icon">❌</span>
        <h3>Sin resultados</h3>
        <p>Los parametros de busqueda que has introducido no produjeron ningun resultado</p>
      </div>
      <div class="card-grid" v-if="results.some((result) => result.type === 'record')">
        <div
          class="card"
          v-for="result in results.filter((res) => res.type === 'record')"
          :key="`record-${result.id}`"
        >
          <router-link :to="`/${result.type}/${result.id}`">
            <img
              v-if="result.thumbnail"
              :src="'https://arcadium.cluster24.libnamic.eu' + result.thumbnail"
              alt=""
            />
            <h3>{{ result.title }}</h3>
          </router-link>
        </div>
      </div>
      <div class="card-grid" v-if="results.some((result) => result.type === 'collection')">
        <div
          class="card"
          v-for="result in results.filter((result) => result.type === 'collection')"
          :key="`collection-${result.id}`"
        >
          <router-link :to="`/${result.type}/${result.id}`">
            <img
              v-if="result.thumbnail"
              :src="'https://arcadium.cluster24.libnamic.eu' + result.thumbnail"
              alt=""
            />
            <h3>{{ result.title }}</h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  min-height: 80vh;
}

.search-panel {
  background-color: var(--superficie);
  border-radius: 0.75rem;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-title {
  color: var(--blanco);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.scope-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.scope-btn {
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  color: var(--blanco);
  cursor: pointer;
  border: 1px solid var(--gris);
  font-size: 1rem;
}

.scope-btn.active {
  background-color: var(--primario);
  color: var(--oscuro);
  border-color: var(--primario);
  font-weight: bold;
}

.search-label {
  color: var(--gris);
  font-size: 0.75rem;
  letter-spacing: 0.1rem;
  margin-bottom: 0.5rem;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 1rem;
}

.filter-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.filter-select {
  padding: 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 1rem;
}

.filter-input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid var(--gris);
  background-color: var(--oscuro);
  color: var(--blanco);
  font-size: 1rem;
}

.filter-remove {
  background: none;
  border: none;
  color: var(--gris);
  cursor: pointer;
  font-size: 1rem;
}

.add-filter {
  background: none;
  border: none;
  color: var(--primario);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;

  text-align: left;
}

.search-btn {
  background-color: var(--primario);
  color: var(--oscuro);
  border: none;
  border-radius: 0.4rem;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--gris);
  text-align: center;
  padding: 4rem;
}

.empty-icon {
  font-size: 3rem;
}

.results-panel {
  width: 100%;
}
@media (max-width: 768px) {
  .search-panel {
    padding: 1rem !important;
    gap: 1rem !important;
  }

  .scope-buttons {
    flex-direction: column !important;
  }

  .filter-row {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 0.5rem !important;
    border-bottom: 1px solid var(--gris);
    padding-bottom: 1rem;
  }

  .filter-select,
  .filter-input {
    width: 100% !important;
  }
}
</style>
