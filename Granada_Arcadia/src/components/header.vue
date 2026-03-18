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
            <router-link :to="{ name: 'record' }">Registros</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'collection' }">Colecciones</router-link>
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
.main-header::after {
  content: '';
  position: absolute;
  left: 0;

  width: 100%;
  height: 0.5rem;
  background-color: #aa871c;
  background: linear-gradient(155deg, #aa871c, #a68c3fe2, #aa871c, #a68c3fe2);
}
.main-header {
  position: relative;
  background-color: #333;
  background: linear-gradient(135deg, #212121, #757575, #212121);
  color: white;
  padding: 20px;
  height: 9rem;
}

.nav-bg {
  justify-content: space-between;

  margin: 0 auto;
  height: 10rem;
  width: min(90rem, 90%);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
}

.nav-bg .nav-footer {
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
  font-size: 2rem;
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
