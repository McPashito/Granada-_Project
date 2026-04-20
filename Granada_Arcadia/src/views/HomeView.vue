<script>
import BrandLogo from '@/components/BrandLogo.vue'

export default {
  components: { BrandLogo },
}
</script>

<template>
  <section class="home-page">
    <div class="home-overlay"></div>

    <section class="home-content">
      <div class="home-top">
        <BrandLogo />
      </div>

      <header class="hero">
        <p class="hero__eyebrow">Patrimonio cultural digital</p>
        <h1>Explora obras y colecciones con una interfaz clara y cuidada</h1>
        <p class="hero__text">
          Licium Classic reúne registros y colecciones en un entorno visual limpio, pensado para
          consultar información, relacionar piezas y navegar por el catálogo de forma sencilla.
        </p>
      </header>

      <section class="home-actions">
        <RouterLink to="/record" class="home-card home-card--primary">
          <span class="home-card__label">Explorar</span>
          <h2>Registros</h2>
          <p>
            Accede a fichas individuales con información detallada sobre cada obra, sus
            características y sus relaciones.
          </p>
        </RouterLink>

        <RouterLink to="/collection" class="home-card">
          <span class="home-card__label">Descubrir</span>
          <h2>Colecciones</h2>
          <p>
            Recorre agrupaciones temáticas e históricas para entender mejor el contexto y la
            conexión entre piezas.
          </p>
        </RouterLink>
      </section>
    </section>
  </section>
</template>

<style scoped>
@import '@/assets/variables.css';

.home-page {
  position: relative;
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  background:
    linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')
      center / cover no-repeat;
  overflow: hidden;
}

.home-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.35));
  pointer-events: none;
}

.home-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
}

.home-top {
  display: flex;
  justify-content: flex-start;
}

.hero {
  max-width: 760px;
  padding: 2rem 2.25rem;
  border-radius: 1.5rem;
  background: rgba(20, 20, 20, 0.52);
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.hero__eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primario);
  font-weight: 700;
}

.hero h1 {
  margin: 0 0 1rem;
  font-family: var(--fuente-titulo);
  font-size: clamp(2.2rem, 4vw, 4.25rem);
  line-height: 1.1;
  color: var(--blanco);
}

.hero__text {
  margin: 0;
  max-width: 60ch;
  font-family: var(--fuente-cuerpo);
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--blanco);
}

.home-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.home-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: 260px;
  padding: 2rem;
  border-radius: 1.5rem;
  text-decoration: none;
  color: var(--blanco);
  background: rgba(90, 90, 90, 0.72);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.home-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.2);
  background: rgba(105, 105, 105, 0.78);
}

.home-card--primary {
  background: rgba(110, 110, 110, 0.8);
}

.home-card__label {
  display: inline-flex;
  width: fit-content;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(255, 193, 7, 0.16);
  color: var(--primario);
}

.home-card h2 {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-size: 2rem;
  line-height: 1.15;
  text-decoration: underline;
  color: var(--blanco);
}

.home-card p {
  margin: 0;
  font-family: var(--fuente-cuerpo);
  font-size: 1.15rem;
  line-height: 1.65;
  color: var(--blanco);
}

@media (max-width: 1024px) {
  .home-page {
    padding: 2rem 1.25rem 3rem;
  }

  .hero {
    max-width: 100%;
  }

  .home-actions {
    grid-template-columns: 1fr;
  }

  .home-card {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 1.5rem 1rem 2rem;
  }

  .home-content {
    gap: 1.5rem;
  }

  .hero {
    padding: 1.35rem 1.1rem;
    border-radius: 1rem;
  }

  .hero__eyebrow {
    font-size: 0.8rem;
  }

  .hero__text {
    font-size: 1rem;
    line-height: 1.55;
  }

  .home-card {
    padding: 1.25rem 1rem;
    border-radius: 1rem;
  }

  .home-card h2 {
    font-size: 1.6rem;
  }

  .home-card p {
    font-size: 1rem;
    line-height: 1.55;
  }
}
</style>
