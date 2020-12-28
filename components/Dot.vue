<template>
  <span class="dot" :class="{ [state]: true }"></span>
</template>

<script>
export default {
  props: ['state']
}
</script>

<style lang="scss">
.dot {
  width: 12px;
  height: 12px;
  border-radius: 20px;
  background-color: gray;
  display: inline-block;
}
.on {
  background-color: green;
}
.off {
  background-color: red;
}
</style>
