<template>
  <div>
    channels
    <a-button @click="gotoNewChannel">ADD</a-button>
    <ChannelsTable :data="channels" />
  </div>
</template>

<script>
import ChannelsTable from '~/components/ChannelsTable'
export default {
  components: {
    ChannelsTable
  },
  data() {
    return {
      channels: []
    }
  },
  methods: {
    gotoNewChannel() {
      this.$router.push('/channel/')
    }
  }
}
</script>

<style></style>
