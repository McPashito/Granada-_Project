<script setup></script>

<template>
  <header class="main-header">
    <div class="nav-bg">
      <div class="licium-logo">
        <h2>Licium</h2>
        <h3>Classic</h3>
      </div>
      <nav class="nav-footer">
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
          <li>
            <router-link :to="{ name: 'search' }">Busqueda avanzada</router-link>
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
  padding: 0.8rem;
  border-radius: 0.8rem;
}
</style>
