<template>
  <div>
    <div v-for="item in items" :key="item._id">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['items']
}
</script>

<style></style>
