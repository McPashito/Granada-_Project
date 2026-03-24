<script>
import { getRecordById } from '@/services/api'
export default {
  data() {
    return {
      record: null,
    }
  },
  async mounted() {
    this.record = await getRecordById(this.$route.params.id)
  },
}
</script>
<template>
  <section class="detalle" v-if="record">
    <div class="detalle-imagen">
      <img
        v-if="record.thumbnail"
        :src="'https://arcadium.cluster24.libnamic.eu' + record.thumbnail"
        alt=""
      />
      <h3>{{ record.title }}</h3>
      <h2>{{ record.creator }}</h2>
      <h2>{{ record.date }}</h2>
    </div>
    <div class="descripcion">
      <h4>Descripcion:</h4>
      <p>{{ record.description }}</p>
    </div>
  </section>
</template>
<style scoped>
.detalle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  min-height: 80vh;
}

.detalle-imagen {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--superficie);
  border-radius: 0.5rem;
  overflow: hidden;
  width: 300px;
}

.detalle-imagen img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.detalle-imagen h3,
.detalle-imagen h2 {
  color: var(--blanco);
  padding: 0.5rem;
  text-align: center;
}
.detalle-imagen h3 {
  font-size: 1.5rem;
}
.detalle-imagen h2 {
  font-size: 1rem;
}
</style>
