<template>
  <div class="brand-logo">
    <h2 class="brand-logo__title">Licium</h2>
    <h3 class="brand-logo__subtitle">Classic</h3>
  </div>
</template>

<style scoped>
@import '@/assets/variables.css';

.brand-logo {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
}

.brand-logo__title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.55rem;
  font-weight: 500;
  color: var(--dorado-logo);
  text-decoration: underline;
  margin: 0;
}

.brand-logo__subtitle {
  font-family: 'Dancing Script', cursive;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 767px) {
  .brand-logo__title {
    font-size: 1.45rem;
    font-weight: 350;
    margin: 0;
  }

  .brand-logo__subtitle {
    font-size: 0.9rem;
    font-weight: 300;
    margin: 0;
  }
}
</style>
