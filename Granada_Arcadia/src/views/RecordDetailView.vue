<script>
import { getItemById } from '@/services/api'
import { imageFormat } from '@/utils/imageFormat'
import DetailCard from '@/components/DetailCard.vue'
export default {
  components: {
    DetailCard,
  },
  data() {
    return {
      record: null,
      entity: 'record',
    }
  },
  async mounted() {
    this.record = await getItemById(this.$route.params.id, this.entity)
  },
  methods: {
    imageFormat,
  },
}
</script>
<template>
  <DetailCard
    v-if="record"
    :key="record.id"
    :image="record?.thumbnail ? imageFormat(record.thumbnail, 'large') : null"
    :title="record.title"
    :date="record.date"
    :description="record.description"
  />
</template>
