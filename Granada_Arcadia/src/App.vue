<script setup>
import MainFooter from './components/MainFooter.vue'
import MainHeader from './components/MainHeader.vue'
</script>

<template>
  <MainHeader />
  <main>
    <RouterView />
  </main>
  <MainFooter />
</template>

<style>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
