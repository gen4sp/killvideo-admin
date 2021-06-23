<template>
  <div class="mi-preview" :style="iconStyle"></div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      cdnUrl: 'http://cdn.killvideo.tv/'
    }
  },
  computed: {
    iconStyle() {
      return {
        backgroundImage: `url("${this.cdnUrl + this.data.preview}")`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mi-preview {
  width: 100%;
  height: 100%;
  background-size: cover;
}
</style>
