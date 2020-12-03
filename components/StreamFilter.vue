<template>
  <div>
    <a-input-number placeholder="Likes" v-model="query.l" />
    <a-input-number placeholder="Views" v-model="query.v" />
    <a-input-number placeholder="LPD" v-model="query.lpd" />
    <a-input-number placeholder="VPD" v-model="query.vpd" />
    =={{ query }}==
    <a-button @click="fetch">Fetch</a-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      query: {
        l: null,
        v: null,
        lpd: null,
        vpd: null
      }
    }
  },
  methods: {
    fetch() {
      this.$emit('onFetch', this.query)
    }
  }
}
</script>

<style></style>
