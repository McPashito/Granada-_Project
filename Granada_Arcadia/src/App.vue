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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  flex: 1;
  display: flex;
  align-items: center;
}
body {
  background-color: #18181ad3;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
