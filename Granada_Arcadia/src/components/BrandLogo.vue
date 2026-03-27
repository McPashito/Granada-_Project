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
  line-height: 1;
}
.brand-logo__title {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-weight: 500;
  color: var(--dorado-logo);
  text-decoration: underline;
  margin: 0;
}

.brand-logo__subtitle {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .brand-logo__title {
    font-size: 2rem;
    font-weight: 350;
    margin: 0;
  }

  .brand-logo__subtitle {
    font-size: 1.33rem;
    font-weight: 300;
    margin: 0;
  }
}
</style>
