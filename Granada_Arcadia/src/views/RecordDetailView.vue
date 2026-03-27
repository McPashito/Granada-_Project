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
      <h3>Titulo: {{ record.title }}</h3>
      <h2>Autor: {{ record.creator }}</h2>
      <h2>Fecha: {{ record.date }}</h2>
      <h2>Descripcion:</h2>
      <p>{{ record.description }}</p>
    </div>
  </section>
</template>
<style scoped>
.detalle {
  display: flex;
  flex-direction: row;
  background-color: dimgray;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: left;
}

.detalle-imagen {
  margin-left: 3rem;
  background-color: dimgray;
  width: 300px;
  height: auto;
}
.descripcion {
  display: flex;
  flex-direction: column;
  text-align: left;

  color: aliceblue;
}
.descripcion h3 {
  font-size: 2rem;
}
.descripcion h2 {
  font-size: 1.5rem;
}
.descripcion p {
  font-size: 1rem;
}
</style>
