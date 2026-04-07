<script>
import BrandLogo from '@/components/BrandLogo.vue'

export default {
  components: { BrandLogo },
}
</script>

<template>
  <section class="home-page">
    <section class="home">
      <BrandLogo />

      <header class="hero">
        <h1>Explora el patrimonio cultural digital</h1>
        <p>
          Licium Classic es una plataforma para consultar, organizar y relacionar obras, autores y
          colecciones de forma clara y accesible.
        </p>
      </header>

      <div class="semi-navs">
        <RouterLink to="/record" class="card-link">
          <article class="home-card">
            <h2>Registros</h2>
            <p>
              Accede a fichas individuales con información detallada sobre cada obra, sus
              características y sus relaciones.
            </p>
          </article>
        </RouterLink>

        <RouterLink to="/collection" class="card-link">
          <article class="home-card">
            <h2>Colecciones</h2>
            <p>
              Explora agrupaciones temáticas e históricas para comprender mejor el contexto y la
              conexión entre piezas.
            </p>
          </article>
        </RouterLink>
      </div>
    </section>
  </section>
</template>
