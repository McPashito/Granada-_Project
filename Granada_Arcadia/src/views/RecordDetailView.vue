<script>
import { getRecordById } from '@/services/api'
import { imageFormat } from '@/utils/imageFormat'
import DetailCard from '@/components/DetailCard.vue'
export default {
  components: {
    DetailCard,
  },
  data() {
    return {
      record: null,
    }
  },
  async mounted() {
    this.record = await getRecordById(this.$route.params.id)
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
