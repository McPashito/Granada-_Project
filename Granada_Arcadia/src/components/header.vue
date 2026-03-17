<script setup></script>

<template>
  <header class="main-header">
    <div class="nav-bg">
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
}
.nav-bg {
  margin: 2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: row;
  grid-row: 1 / 2;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #0097a7;
  color: #ffffff;
  border-radius: 0.8rem;
}
.nav-footer ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  gap: 20rem;
}
.nav-footer a {
  text-decoration: none;
  color: var(--blanco);
  font-size: 1.2rem;
  font-weight: bold;
}
.nav-footer a:hover {
  text-decoration: underline;
  color: #ffc107;
}
</style>
