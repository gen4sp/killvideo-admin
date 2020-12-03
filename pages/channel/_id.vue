<template>
  <div>
    <div>
      <a-input placeholder="Channel name" />
    </div>

    <div>
      Streams:
      <a-button @click="addStream">Add stream</a-button>
      <ChannelSources />
    </div>
    <!-- <AddStreamModal :visible="asmVisible" @onClick="asmOnClick" /> -->
  </div>
</template>

<script>
import ChannelSources from '~/components/ChannelSources'
// import AddStreamModal from '~/components/modals/AddStreamModal'
export default {
  components: {
    ChannelSources
    // AddStreamModal
  },
  data() {
    return {
      asmVisible: false
    }
  },
  methods: {
    addStream() {
      // this.asmVisible = true
      this.$router.push('/stream')
    }
    // asmOnClick() {
    // this.asmVisible = false
    // }
  }
}
</script>

<style></style>
