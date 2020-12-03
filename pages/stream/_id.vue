<template>
  <div>
    <a-card>
      Source ({{ fetched }}):
      <SourceSelector :source="stream.source" @onSelect="handleSourceSelect" />
      <div v-if="stream.source._id">
        <StreamFilter :stream="stream" @onFetch="handleStreamFilterFetch" />
        <StreamItems :items="items" />
      </div>
    </a-card>
  </div>
</template>

<script>
import SourceSelector from '~/components/SourceSelector'
import StreamFilter from '~/components/StreamFilter'
import StreamItems from '~/components/StreamItems'
export default {
  components: {
    SourceSelector,
    StreamFilter,
    StreamItems
  },
  data() {
    return {
      fetched: false,
      stream: {
        source: null
      }
    }
  },
  methods: {
    handleStreamFilterFetch(query) {
      return this.$axios
        .get(`/source/${this.stream.source._id}/items`)
        .then((res) => {
          console.log('r', res)
        })
    },
    handleSourceSelect(source) {
      console.log('aa', source)
      this.stream.source = source
    }
  },
  mounted() {
    console.log('s', this.$route.params.id)
    if (this.$route.params.id) {
      return this.$axios
        .get(`/streams/${this.$route.params.id}`)
        .then((res) => {
          console.log('r', res)
          this.fetched = true
        })
    }
    this.fetched = true
  }
}
</script>

<style></style>
