<script setup>
defineProps({
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <section class="detail-card">
    <div class="detail-card__media">
      <img v-if="image" :src="image" :alt="title" :title="title" />
    </div>

    <div class="detail-card__body">
      <p class="detail-card__eyebrow">Registro</p>

      <div class="detail-card__content">
        <div class="detail-row">
          <span class="detail-label">Titulo:</span>
          <span class="detail-value detail-value--title">{{ title }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Fecha:</span>
          <span class="detail-value">{{ date || 'Sin fecha' }}</span>
        </div>

        <div class="detail-row detail-row--description">
          <span class="detail-label">Descripcion:</span>
          <span class="detail-value detail-value--description">
            {{ description || 'Sin descripcion' }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.detail-card {
  width: min(640px, calc(100% - 1.5rem));
  min-height: 16rem;
  display: flex;
  align-items: stretch;
  margin: 1rem auto;
  background: var(--superficie);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
}

.detail-card__media {
  flex: 0 0 clamp(150px, 22vw, 240px);
  background: var(--oscuro);
}

.detail-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-card__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(1rem, 2.4vw, 1.5rem);
  color: var(--blanco);
  background: var(--superficie);
}

.detail-card__eyebrow {
  margin-bottom: 0.7rem;
  font-family: var(--fuente-titulo);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dorado);
}

.detail-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  max-width: 100%;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-row--description {
  gap: 0.35rem;
}

.detail-label {
  font-family: var(--fuente-titulo);
  font-size: clamp(0.75rem, 0.95vw, 0.9rem);
  color: var(--gris);
}

.detail-value {
  font-family: var(--fuente-cuerpo);
  font-size: clamp(0.85rem, 1.05vw, 1rem);
  line-height: 1.35;
  color: var(--blanco);
}

.detail-value--title {
  font-family: var(--fuente-titulo);
  font-size: clamp(1.25rem, 1.9vw, 1.85rem);
  line-height: 1.08;
}

.detail-value--description {
  font-size: clamp(0.82rem, 1vw, 0.95rem);
}

@media (max-width: 768px) {
  .detail-card {
    width: min(100%, calc(100% - 1rem));
    min-height: auto;
    flex-direction: column;
    margin: 0.75rem auto;
  }

  .detail-card__media {
    flex-basis: auto;
    aspect-ratio: 1 / 1;
  }

  .detail-card__body {
    padding: 0.9rem;
  }

  .detail-value--title {
    font-size: 1.3rem;
  }
}
</style>
