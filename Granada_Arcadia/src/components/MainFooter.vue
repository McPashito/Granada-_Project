<script>
import BrandLogo from './BrandLogo.vue'

export default {
  components: {
    BrandLogo,
  },
  data() {
    return {
      menuAbierto: false,
      sobreAbierto: false,
      contactoAbierto: false,
    }
  },
  methods: {
    toggleSection(section) {
      this.menuAbierto = section === 'menu' ? !this.menuAbierto : false
      this.sobreAbierto = section === 'sobre' ? !this.sobreAbierto : false
      this.contactoAbierto = section === 'contacto' ? !this.contactoAbierto : false
    },
  },
}
</script>

<template>
  <footer class="main-footer">
    <section class="main-footer__container layout-container">
      <BrandLogo />
      <div class="main-footer__sections">
        <button class="main-footer__toggle" @click="toggleSection('menu')">Menu</button>
        <nav class="main-footer__menu" :class="menuAbierto ? 'nav-abierto' : ''">
          <p>Menú</p>
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Inicio</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'record' }">Registros</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'collection' }">Colecciones</router-link>
            </li>
          </ul>
        </nav>
        <button class="main-footer__toggle" @click="toggleSection('sobre')">Sobre nosotros</button>

        <nav class="main-footer__about" :class="sobreAbierto ? 'nav-abierto' : ''">
          <p>Sobre Nosotros</p>
          <ul>
            <li>
              <a href="#">Quienes Somos</a>
            </li>
            <li>
              <a href="#">Nuestro cometido</a>
            </li>
            <li>
              <a href="#">Política de Privacidad</a>
            </li>
          </ul>
        </nav>
        <button class="main-footer__toggle" @click="toggleSection('contacto')">Contacto</button>

        <nav class="main-footer__contact" :class="contactoAbierto ? 'nav-abierto' : ''">
          <p>Contacto</p>
          <ul>
            <li>
              <a href="#">Contacto</a>
            </li>
            <li>
              <a href="#">Soporte</a>
            </li>
            <li>
              <a href="#">Redes Sociales</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </footer>
</template>

<style scoped>
@import '@/assets/variables.css';

.main-footer::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 0.18rem;
  background: var(--gradiente-dorado);
}

.main-footer {
  position: relative;
  background: var(--gradiente-fondo);
  font-size: 0.85rem;
  color: var(--blanco);
  height: 8.25rem;
}

.main-footer__toggle {
  display: none;
  font-size: 0.85rem;
  padding: 0.25rem 0.45rem;
}

.main-footer__sections {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.main-footer__container.layout-container {
  display: grid;
  height: 100%;
  align-items: center;
  grid-template-columns: 32% auto auto auto;
  justify-content: space-evenly;
}

.main-footer__container.layout-container p {
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 0.35rem;
}

.main-footer__menu ul,
.main-footer__about ul,
.main-footer__contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-footer__menu ul li,
.main-footer__about ul li,
.main-footer__contact ul li {
  margin-bottom: 0.35rem;
}

.main-footer__menu ul li a,
.main-footer__about ul li a,
.main-footer__contact ul li a {
  color: var(--blanco);
  text-decoration: none;
}

@media (max-width: 767px) {
  .main-footer {
    height: auto;
    font-size: 0.85rem;
  }

  .main-footer__container.layout-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
  }

  .main-footer__container.layout-container p {
    display: none;
  }

  .main-footer__toggle {
    display: block;
    background: none;
    border: none;
    color: var(--blanco);
    font-size: 0.85rem;
    cursor: pointer;
    text-align: left;
    padding: 0.25rem 0;
  }

  .main-footer__menu,
  .main-footer__about,
  .main-footer__contact {
    display: none;
  }

  .main-footer__menu li,
  .main-footer__about li,
  .main-footer__contact li,
  .main-footer__menu a,
  .main-footer__about a,
  .main-footer__contact a {
    font-size: 0.85rem;
    margin: 0.25rem 0;
  }

  .main-footer__menu.nav-abierto,
  .main-footer__about.nav-abierto,
  .main-footer__contact.nav-abierto {
    display: block;
  }

  .main-footer__sections {
    flex-direction: column;
    gap: 0;
  }
}
</style>
