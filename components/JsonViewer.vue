<template>
  <div class="json-wrapper">
    <vue-json-pretty :data="jsondata"></vue-json-pretty>
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
      jsondata: {}
    }
  },
  mounted() {
    console.log('PRES', this.url)
    // axios.get(this.url)
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
        console.log('RES', res)
        this.jsondata = res.data
      })
  }
}
</script>

<style lang="scss">
.json-wrapper {
  height: 200px;
  overflow: scroll;
  background-color: #eee;
}
</style>
