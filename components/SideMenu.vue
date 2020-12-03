<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="['/channels']"
    @click="onSelect"
  >
    <a-menu-item v-for="item in items" :key="item.path">
      <a-icon :type="item.icon" />
      <span>{{ item.label }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { label: 'Channels', path: '/channels', icon: 'user' },
        { label: 'Sources', path: '/sources', icon: 'video-camera' }
      ]
    }
  },
  methods: {
    onSelect(item, key, keyPath) {
      this.$router.push(item.key)
    }
  }
}
</script>

<style></style>
