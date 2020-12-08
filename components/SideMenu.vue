<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="['/templates']"
    :selected-keys="selectedKeys"
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
        { label: 'Templates', path: '/templates', icon: 'snippets' },
        { label: 'Tasks', path: '/tasks', icon: 'schedule' },
        { label: 'Users', path: '/users', icon: 'video-camera' }
      ]
    }
  },
  computed: {
    selectedKeys() {
      return [this.$route.path]
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
