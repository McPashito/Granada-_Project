<script>
export default {
  data() {
    return {
      menuAbierto: false,
    }
  },
}
</script>

<template>
  <header class="main-header">
    <div class="nav-bg">
      <div class="licium-logo">
        <h2>Licium</h2>
        <h3>Classic</h3>
      </div>
      <button class="botonburger" @click="menuAbierto = !menuAbierto">☰</button>
      <nav class="nav-footer" :class="menuAbierto ? 'nav-abierto' : ''">
        <ul>
          <li><router-link :to="{ name: 'Home' }">Inicio</router-link></li>
          <li><router-link :to="{ name: 'record' }">Registros</router-link></li>
          <li><router-link :to="{ name: 'collection' }">Colecciones</router-link></li>
          <li><router-link :to="{ name: 'search' }">Busqueda avanzada</router-link></li>
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
  height: 0.5rem;
  background: var(--gradiente-dorado);
}

.main-header {
  position: relative;
  background: var(--gradiente-fondo);
  color: var(--blanco);
  padding: 0;
  height: 9rem;
}

.licium-logo h2 {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-weight: 500;
  color: var(--dorado-logo);
  text-decoration: underline;
  margin: 0;
}

.licium-logo h3 {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.nav-bg {
  justify-content: space-between;
  margin: 0 auto;
  height: 9rem;
  width: min(90rem, 90%);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-family: 'Roboto', sans-serif;
  color: var(--blanco);
}

.nav-footer ul {
  display: flex;
  justify-content: center;
  gap: 3rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-footer a {
  text-decoration: none;
  color: var(--blanco);
  font-size: 2rem;
  font-weight: bold;
  padding: 0.8rem;
}

.nav-footer a:hover {
  color: var(--oscuro);
  background-color: var(--primario);
  text-decoration: underline;
  padding: 0.8rem;
  border-radius: 0.8rem;
}

.botonburger {
  display: none;
}

@media (max-width: 768px) {
  .main-header {
    margin: 0;
    overflow: hidden;
    height: auto;
    padding-bottom: 0.5rem;
  }

  .nav-bg {
    height: auto;
    flex-wrap: wrap;
    padding: 0.8rem 1rem;
    width: 100%;
  }

  .licium-logo h2 {
    font-size: 2rem;
    font-weight: 350;
    margin: 0;
  }

  .licium-logo h3 {
    font-size: 0.9rem;
    font-weight: 300;
    margin: 0;
  }

  .botonburger {
    display: block;
    background: none;
    border: none;
    color: var(--blanco);
    font-size: 2rem;
    cursor: pointer;
    margin-left: auto;
  }

  .nav-footer {
    display: none;
    width: 100%;
  }

  .nav-footer.nav-abierto {
    display: block;
  }

  .nav-footer ul {
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.5rem 0;
  }

  .nav-footer a {
    padding: 0.4rem 0;
    font-size: 1rem;
  }
  .nav-footer a:hover {
    background-color: none;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .nav-footer ul {
    gap: 1.25rem;
  }
  .nav-footer a {
    padding: 0.2rem;
    font-size: 1.25rem;
  }
}
</style>
