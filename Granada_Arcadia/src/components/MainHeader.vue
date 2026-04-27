<script>
import BrandLogo from './BrandLogo.vue'

export default {
  components: {
    BrandLogo,
  },
  data() {
    return {
      menuAbierto: false,
    }
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle('light')

      const temaActual = document.body.classList.contains('light') ? 'light' : 'dark'
      localStorage.setItem('theme', temaActual)
    },
  },
  mounted() {
    const temaGuardado = localStorage.getItem('theme')

    if (temaGuardado === 'light') {
      document.body.classList.add('light')
    } else if (temaGuardado === 'dark') {
      document.body.classList.remove('light')
    }
  },
}
</script>

<template>
  <header class="main-header">
    <div class="main-header__container layout-container">
      <brand-logo />
      <button class="main-header__toggle" @click="menuAbierto = !menuAbierto">☰</button>
      <button class="main-header__theme" @click="toggleTheme">🌙</button>

      <nav class="main-header__nav" :class="menuAbierto ? 'nav-abierto' : ''">
        <ul class="main-header__list">
          <li class="main-header__item">
            <router-link class="main-header__link" :to="{ name: 'Home' }">Inicio</router-link>
          </li>
          <li class="main-header__item">
            <router-link class="main-header__link" :to="{ name: 'record' }">Registros</router-link>
          </li>
          <li class="main-header__item">
            <router-link class="main-header__link" :to="{ name: 'collection' }"
              >Colecciones</router-link
            >
          </li>
          <li class="main-header__item">
            <router-link class="main-header__link" :to="{ name: 'search' }">Buscador</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/variables.css';

.main-header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.18rem;
  background: var(--gradiente-dorado);
}

.main-header {
  position: relative;
  background: var(--gradiente-fondo);
  color: var(--blanco);
  padding: 0;
  height: 3.75rem;
}

.main-header__container.layout-container {
  justify-content: space-between;
  height: 3.75rem;
  display: flex;
  align-items: center;
  font-family: var(--fuente-cuerpo);
  color: var(--blanco);
}

.main-header__list {
  display: flex;
  justify-content: center;
  gap: 1.1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.main-header__link {
  text-decoration: none;
  color: var(--blanco);
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.3rem 0.45rem;
}

.main-header__link:hover {
  color: var(--oscuro);
  background-color: var(--dorado);
  text-decoration: underline;
  padding: 0.3rem 0.45rem;
  border-radius: 0.4rem;
}

.main-header__toggle {
  display: none;
}

.main-header__theme {
  background: var(--superficie);
  color: var(--blanco);
  border: none;
  border-radius: 0.4rem;
  padding: 0.28rem 0.55rem;
  cursor: pointer;
  margin-left: 0.75rem;
  font-size: 0.8rem;
}

@media (max-width: 767px) {
  .main-header {
    margin: 0;
    overflow: hidden;
    height: auto;
    padding-bottom: 0.35rem;
  }

  .main-header__container.layout-container {
    height: auto;
    flex-wrap: wrap;
    padding: 0.6rem 0.8rem;
    width: 100%;
  }

  .main-header__toggle {
    display: block;
    background: none;
    border: none;
    color: var(--blanco);
    font-size: 1.4rem;
    cursor: pointer;
    margin-left: auto;
  }

  .main-header__nav {
    display: none;
    width: 100%;
  }

  .main-header__nav.nav-abierto {
    display: block;
  }

  .main-header__list {
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.4rem 0;
  }

  .main-header__link {
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }

  .main-header__link:hover {
    background-color: transparent;
  }
}

@media (min-width: 768px) and (max-width: 1025px) {
  .main-header {
    height: 3.5rem;
  }

  .main-header__container.layout-container {
    height: 3.5rem;
  }

  .main-header__list {
    gap: 0.9rem;
  }

  .main-header__link {
    padding: 0.2rem 0.35rem;
    font-size: 0.85rem;
  }
}
</style>
