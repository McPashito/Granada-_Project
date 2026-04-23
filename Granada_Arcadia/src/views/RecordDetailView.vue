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

    console.log(this.record.canonical_joined_metadata)
    console.log(this.record.joined_metadata)
  },
  methods: {
    imageFormat,
  },
}
</script>
<template>
  <DetailCard
    v-if="record"
    :image="record?.thumbnail ? imageFormat(record.thumbnail, 'large') : null"
    :title="record?.canonical_joined_metadata?.title?.values?.[0]?.['@value'] || ''"
    :date="record?.canonical_joined_metadata?.date?.values?.[0]?.['@value'] || ''"
    :description="record?.canonical_joined_metadata?.description?.values?.[0]?.['@value'] || ''"
  />
</template>
