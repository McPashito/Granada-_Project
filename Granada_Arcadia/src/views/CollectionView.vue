<script>
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
import { getCollections } from '../services/api.js'

export default {
  data() {
    return {
      collections: [],
    }
  },
  async mounted() {
    this.collections = await getCollections()
  },
}
</script>

<template>
  <section class="cuadro">
    <div class="enlace" v-for="collection in collections" :key="collection.name">
      <h3>{{ collection.metadata_fields['dcterms:title'][0]['@value'] }}</h3>
    </div>
  </section>
</template>

<style>
.cuadro {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 0;
  gap: 1rem;
  padding: 0;
}
.enlace {
  background-color: #333;
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}

.cuadro {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 1rem;
  padding: 1rem;
}
.enlace {
  background-color: #333;
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
}
</style>
