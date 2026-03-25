<script setup></script>

<template>
  <footer>
    <section class="navs">
      <div class="licium-logo">
        <h2>Licium</h2>
        <h3>Classic</h3>
      </div>
      <nav class="Menu">
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
      <nav class="sobre-nosotros">
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
      <nav class="contacto">
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
    </section>
  </footer>
</template>

<style scoped>
@import '@/assets/variables.css';

footer::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background: var(--gradiente-dorado);
}

footer {
  position: relative;
  background: var(--gradiente-fondo);
  font-size: 1.5rem;
  color: var(--blanco);
  height: 15rem;
}

.navs {
  display: grid;
  height: 100%;
  align-items: center;
  grid-template-columns: 40% auto auto auto;
  justify-content: space-evenly;
  padding: 1rem 4rem;
}

.navs p {
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
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

.Menu ul,
.sobre-nosotros ul,
.contacto ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.Menu ul li,
.sobre-nosotros ul li,
.contacto ul li {
  margin-bottom: 10px;
}

.Menu ul li a,
.sobre-nosotros ul li a,
.contacto ul li a {
  color: var(--blanco);
  text-decoration: none;
}
@media (max-width: 768px) {
  footer {
    height: auto;
  }
  .navs {
  }
  .licium-logo h2 {
    font-size: 2rem;
  }

  .licium-logo h3 {
    font-size: 1.33rem;
  }
}
</style>
