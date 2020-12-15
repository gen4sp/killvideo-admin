<template>
  <div class="json-wrapper">
    <div v-if="loading" class="loader">
      <a-spin />
    </div>
    <vue-json-pretty v-else :data="jsondata"></vue-json-pretty>
  </div>
</template>

<script>
// import VueJsonPretty from 'vue-json-pretty'
// import 'vue-json-pretty/lib/styles.css'
// import axios from 'axios'
export default {
  components: {
    // VueJsonPretty
  },
  props: ['url'],
  data() {
    return {
      jsondata: {},
      loading: false
    }
  },
  watch: {
    url() {
      this.fetch()
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.loading = true
      this.jsondata = {}
      console.log('URL', this.url)
      this.$axios
        .$get(this.url, {
          headers: {
            'Access-Control-Origin': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        })
        .then((res) => {
          this.loading = false
          console.log('=-=-=-=-=', res)
          this.jsondata = res
        })
    }
  }
}
</script>

<style lang="scss">
.json-wrapper {
  height: 200px;
  overflow: scroll;
  background-color: #eee;
}
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
