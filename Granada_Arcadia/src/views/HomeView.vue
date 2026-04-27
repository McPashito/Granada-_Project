<script>
import ItemCard from '@/components/ItemCard.vue'
import { searchAdvanced } from '@/services/api'

export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      quickQuery: '',
      quickLoading: false,
      hasQuickSearched: false,
      quickRecordResults: [],
      quickCollectionResults: [],
      recordImage: '/api/core/attachment/action_get/thumb?attachment_id=746&size=small',
      collectionImage: '/api/core/attachment/action_get/thumb?attachment_id=747&size=small',
    }
  },
  methods: {
    async handleQuickSearch() {
      const query = this.quickQuery.trim()

      this.hasQuickSearched = true

      if (!query || this.quickLoading) {
        this.quickRecordResults = []
        this.quickCollectionResults = []
        return
      }

      this.quickLoading = true

      try {
        const [records, collections] = await Promise.all([
          searchAdvanced('records', query, [], 'and'),
          searchAdvanced('collections', query, [], 'and'),
        ])

        this.quickRecordResults = records.slice(0, 3)
        this.quickCollectionResults = collections.slice(0, 3)
      } catch (error) {
        console.error('Error en la búsqueda rápida de Home:', error)
        this.quickRecordResults = []
        this.quickCollectionResults = []
      } finally {
        this.quickLoading = false
      }
    },
  },
}
</script>

<template>
  <section class="landing">
    <div class="landing__container layout-container">
      <header class="landing__hero">
        <p class="landing__brand">Licium Classic</p>
        <p class="landing__eyebrow">Patrimonio cultural digital</p>
        <h1 class="landing__title">Explora el catálogo sin rodeos</h1>
        <p class="landing__text">
          Consulta registros, descubre colecciones y localiza contenido desde una portada más clara,
          más visual y más fácil de recorrer.
        </p>
      </header>

      <section class="landing-section">
        <div class="landing-section__heading">
          <div>
            <p class="landing-section__kicker">Acceso principal</p>
            <h2>Registros</h2>
            <p class="landing-section__description">
              Fichas individuales con información detallada sobre obras, autores y relaciones.
            </p>
          </div>

          <RouterLink to="/record" class="landing-section__link">Ver registros</RouterLink>
        </div>

        <div class="showcase-grid">
          <RouterLink to="/record" class="showcase-card showcase-card--record">
            <div class="showcase-card__media">
              <img
                v-if="recordImage"
                :src="recordImage"
                alt="Imagen destacada de registro"
                class="showcase-card__img"
              />
              <div
                v-else
                class="showcase-card__placeholder showcase-card__placeholder--record"
              ></div>
            </div>
            <div class="showcase-card__content">
              <span class="showcase-card__tag">Registro</span>
              <h3>Consulta piezas y fichas individuales</h3>
              <p>
                Navega por entradas concretas, consulta información estructurada sobre cada obra,
                explora sus relaciones y accede al catálogo de registros desde una entrada más clara
                y directa.
              </p>
            </div>
          </RouterLink>
        </div>
      </section>

      <section class="search-band">
        <div class="search-band__text">
          <p class="search-band__kicker">Búsqueda rápida</p>
          <h2>Encuentra algo desde la portada</h2>
          <p>
            Introduce un término y te mostramos coincidencias rápidas de registros y colecciones sin
            salir de la Home.
          </p>
        </div>

        <form class="search-band__form" @submit.prevent="handleQuickSearch">
          <input
            v-model="quickQuery"
            type="search"
            class="search-band__input"
            placeholder="Buscar por título, autor o término..."
            enterkeyhint="search"
            autocapitalize="none"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="submit" class="search-band__button" :disabled="quickLoading">
            {{ quickLoading ? 'Buscando...' : 'Buscar' }}
          </button>
        </form>

        <div v-if="hasQuickSearched" class="search-band__results">
          <p
            v-if="
              !quickLoading &&
              quickRecordResults.length === 0 &&
              quickCollectionResults.length === 0
            "
            class="search-band__empty"
          >
            No se han encontrado coincidencias rápidas. Puedes probar con otro término o usar la
            búsqueda avanzada.
          </p>

          <div v-if="quickRecordResults.length > 0" class="search-band__result-block">
            <div class="search-band__result-head">
              <h3>Registros</h3>
              <RouterLink to="/record" class="search-band__mini-link">Ver todos</RouterLink>
            </div>

            <div class="search-band__grid">
              <ItemCard
                v-for="result in quickRecordResults"
                :key="result.id"
                :title="result.title"
                :image="result.thumbnail || null"
                :to="`/record/${result.id}`"
              />
            </div>
          </div>

          <div v-if="quickCollectionResults.length > 0" class="search-band__result-block">
            <div class="search-band__result-head">
              <h3>Colecciones</h3>
              <RouterLink to="/collection" class="search-band__mini-link">Ver todas</RouterLink>
            </div>

            <div class="search-band__grid">
              <ItemCard
                v-for="result in quickCollectionResults"
                :key="result.id"
                :title="result.title"
                :image="result.thumbnail || null"
                :to="`/collection/${result.id}`"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="landing-section">
        <div class="landing-section__heading">
          <div>
            <p class="landing-section__kicker">Contexto</p>
            <h2>Colecciones</h2>
            <p class="landing-section__description">
              Agrupaciones temáticas e históricas para entender mejor la conexión entre piezas.
            </p>
          </div>

          <RouterLink to="/collection" class="landing-section__link">Ver colecciones</RouterLink>
        </div>

        <div class="showcase-grid">
          <RouterLink to="/collection" class="showcase-card showcase-card--collection">
            <div class="showcase-card__media">
              <img
                v-if="collectionImage"
                :src="collectionImage"
                alt="Imagen destacada de colección"
                class="showcase-card__img"
              />
              <div
                v-else
                class="showcase-card__placeholder showcase-card__placeholder--collection"
              ></div>
            </div>

            <div class="showcase-card__content">
              <span class="showcase-card__tag">Colección</span>
              <h3>Recorridos temáticos</h3>
              <p>
                Explora agrupaciones que ordenan el contenido por contexto, afinidad y lectura, y
                accede a una visión más amplia del catálogo sin depender solo de la navegación
                individual.
              </p>
            </div>
          </RouterLink>
        </div>
      </section>

      <section class="advanced-cta">
        <div>
          <p class="advanced-cta__kicker">Más opciones</p>
          <h2>Búsqueda avanzada</h2>
          <p>
            Si necesitas algo más preciso, puedes acceder al buscador avanzado y combinar filtros
            específicos.
          </p>
        </div>

        <RouterLink to="/search" class="advanced-cta__button">Ir a búsqueda avanzada</RouterLink>
      </section>
    </div>
  </section>
</template>

<style scoped>
@import '@/assets/variables.css';

.landing {
  width: 100%;
  padding: 2.5rem 0 3.5rem;
  background: var(--fondo-general);
  color: var(--texto-general);
}

.landing__container {
  display: grid;
  gap: 3rem;
}

.landing__hero {
  display: grid;
  gap: 0.75rem;
  max-width: 46rem;
}

.landing__brand {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: 1.7rem;
  color: var(--dorado);
}

.landing__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dorado);
}

.landing__title {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.08;
  color: var(--texto-general);
}

.landing__text {
  margin: 0;
  max-width: 40rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--texto-general);
}

.landing-section {
  display: grid;
  gap: 1rem;
}

.landing-section__heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
}

.landing-section__kicker {
  margin: 0 0 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dorado);
}

.landing-section__heading h2 {
  margin: 0 0 0.25rem;
  font-family: var(--fuente-titulo);
  font-size: 1.6rem;
  color: var(--texto-general);
}

.landing-section__description {
  margin: 0;
  max-width: 34rem;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--texto-general);
}

.landing-section__link {
  flex-shrink: 0;
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--dorado);
  border-radius: 999px;
  color: var(--dorado);
  text-decoration: none;
  font-weight: 700;
}

.showcase-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
}

.showcase-card {
  display: grid;
  overflow: hidden;
  border-radius: 0.8rem;
  background: var(--superficie);
  color: var(--texto-general);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.showcase-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.14);
}

.showcase-card--record {
  grid-template-columns: minmax(180px, 260px) 1fr;
  min-height: 16rem;
}

.showcase-card--collection {
  grid-template-columns: minmax(180px, 260px) 1fr;
  min-height: 14rem;
}

.showcase-card__media {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}
.showcase-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.showcase-card__content {
  display: grid;
  align-content: center;
  gap: 0.65rem;
  padding: 1.15rem;
}
.showcase-card__placeholder {
  width: 100%;
  height: 100%;
}

.showcase-card__placeholder--record {
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 193, 7, 0.28), transparent 22%),
    linear-gradient(135deg, rgba(255, 193, 7, 0.14), rgba(0, 151, 167, 0.1)),
    linear-gradient(160deg, #232323, #3a3a3a);
}
.showcase-card__placeholder--collection {
  background:
    radial-gradient(circle at 75% 25%, rgba(255, 193, 7, 0.25), transparent 20%),
    linear-gradient(140deg, rgba(0, 151, 167, 0.14), rgba(255, 193, 7, 0.08)),
    linear-gradient(160deg, #2b2b2b, #404040);
}

.showcase-card__tag {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dorado);
}

.showcase-card__content h3 {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: 1.35rem;
  line-height: 1.2;
  color: var(--texto-general);
}

.showcase-card__content p {
  margin: 0;
  max-width: 38rem;
  font-size: 0.84rem;
  line-height: 1.6;
  color: var(--texto-general);
}

.search-band {
  display: grid;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.search-band__text {
  display: grid;
  gap: 0.35rem;
}

.search-band__kicker {
  margin: 0;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dorado);
}

.search-band__text h2 {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: 1.55rem;
  color: var(--texto-general);
}

.search-band__text p {
  margin: 0;
  max-width: 38rem;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--texto-general);
}

.search-band__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem;
  align-items: center;
  max-width: 36rem;
}

.search-band__input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--gris);
  background: var(--superficie);
  color: var(--texto-general);
  font-size: 0.82rem;
}

.search-band__button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.55rem 0.85rem;
  background: var(--primario);
  color: var(--oscuro);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.search-band__results {
  display: grid;
  gap: 1rem;
  padding-top: 0.25rem;
}

.search-band__result-block {
  display: grid;
  gap: 0.6rem;
}

.search-band__result-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
}

.search-band__result-head h3 {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: 1.2rem;
  color: var(--texto-general);
}

.search-band__mini-link {
  color: var(--dorado);
  font-weight: 700;
  text-decoration: none;
}

.search-band__grid {
  display: grid;
  grid-template-columns: repeat(3, 8rem);
  gap: 0.6rem;
  justify-content: start;
}

.search-band__empty {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--gris);
}

.advanced-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.35rem;
  border-radius: 0.8rem;
  background: var(--superficie);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.advanced-cta__kicker {
  margin: 0 0 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dorado);
}

.advanced-cta h2 {
  margin: 0 0 0.25rem;
  font-family: var(--fuente-titulo);
  font-size: 1.45rem;
  color: var(--texto-general);
}

.advanced-cta p {
  margin: 0;
  max-width: 34rem;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--texto-general);
}

.advanced-cta__button {
  flex-shrink: 0;
  padding: 0.6rem 0.85rem;
  border-radius: 0.5rem;
  background: var(--primario);
  color: var(--oscuro);
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .landing {
    padding: 3.5rem 0 5rem;
  }

  .landing__container {
    gap: 4rem;
  }

  .showcase-card--record,
  .showcase-card--collection {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .showcase-card__media {
    min-height: 220px;
  }

  .search-band__grid {
    grid-template-columns: 1fr 1fr;
  }

  .advanced-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .landing {
    padding: 2.5rem 0 3.5rem;
  }

  .landing__container {
    gap: 3rem;
  }

  .landing__title {
    font-size: 2.4rem;
  }

  .landing__text,
  .landing-section__description,
  .search-band__text p,
  .advanced-cta p,
  .showcase-card__content p {
    font-size: 1rem;
    line-height: 1.65;
  }

  .landing-section__heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .landing-section__heading h2,
  .search-band__text h2,
  .advanced-cta h2 {
    font-size: 2rem;
  }

  .showcase-card__content {
    padding: 1.4rem;
  }

  .showcase-card__content h3 {
    font-size: 1.75rem;
  }

  .search-band__form {
    grid-template-columns: 1fr;
  }

  .search-band__grid {
    grid-template-columns: 1fr;
  }

  .advanced-cta {
    padding: 1.5rem;
  }
}
</style>
