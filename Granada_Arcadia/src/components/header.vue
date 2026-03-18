<script setup></script>

<template>
  <header class="main-header">
    <div class="nav-bg">
      <div class="nav-logo"></div>
      <nav class="nav-footer">
        <ul>
          <li>
            <router-link :to="{ name: 'Home' }">Inicio</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'collection' }">Colecciones</router-link>
          </li>

          <li>
            <router-link :to="{ name: 'record' }">Discos</router-link>
          </li>
        </ul>
      </nav>
      <nav class="nav-logo"></nav>
    </div>
  </header>
</template>

<style scoped>
:root {
  --blanco: #ffffff;
  --oscuro: #212121;
  --primario: #ffc107;
  --secundario: #0097a7;
  --gris: #757575;
  --GrisClaro: #dfe9f3;
}

.main-header {
  background-color: #dfe9f3;
  height: 7.2rem;
}

.nav-bg {
  justify-content: space-between;
  background-color: #0097a7;
  margin: 0 auto;
  height: 100%;
  width: min(90rem, 90%);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
}

.nav-footer {
  width: 100%;
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
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: bold;
  padding: 0.8rem;
}
.nav-footer a:hover {
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  color: #212121;
  background-color: #ffc107;
  padding: 0.8rem;

  border-radius: 0.8rem;
}
</style>
