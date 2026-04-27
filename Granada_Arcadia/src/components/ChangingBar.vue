<template>
  <section class="changing-bar-container">
    <button class="button">GRID</button>
    <button class="button">LIST</button>
  </section>
</template>
<style>
.changing-bar-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  box-sizing: content-box;
  background-color: var(--gris);
}

.button {
  background-color: var(--primario);
  border-radius: 0.5rem;
  border-color: var(--dorado);
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
}
</style>
