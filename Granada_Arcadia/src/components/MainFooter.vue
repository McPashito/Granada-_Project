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

<style>
footer::before {
  content: '';
  position: absolute;

  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: #aa871c;
  background: linear-gradient(155deg, #aa871c, #a68c3fe2, #aa871c, #a68c3fe2);
}

footer {
  position: relative;
  background-color: #333;
  background: linear-gradient(135deg, #212121, #757575, #212121);
  color: white;
  padding: none;
  height: 15rem;
}
.navs {
  grid-column: auto;
  display: grid;
  height: 100%;
  align-items: center;
  justify-content: center;
  grid-template-columns: 40% auto auto auto;
  padding: 2rem;
  justify-content: space-evenly;
  padding: 1rem 4rem;
}
.navs p {
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
}
.licium-logo {
  text-align: left;
  margin-bottom: 20px;
}

.licium-logo h2 {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: rgb(168, 158, 21);
  text-decoration: underline;
  margin: 0;
}

.licium-logo h3 {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  margin: 0;
}

.menu,
.sobre-nosotros,
.contacto {
  flex: 1;
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
  color: white;
  text-decoration: none;
}
</style>
