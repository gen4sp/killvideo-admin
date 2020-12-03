<template>
    <div>
        <i v-if="data" style="color: #a9a9a9" class="el-icon-circle-check"></i>
        <i v-else="data" style="color: gray;" class="el-icon-remove-outline"></i>
    </div>

</template>

<script>
export default {
  name: 'checkCell',
  props: ['data']
}
</script>

<style scoped>

</style>
