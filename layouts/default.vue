<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="hheader">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="logout" @click="logout">
          Logout
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: 'calc(100vh - 108px)'
        }"
      >
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from '~/components/SideMenu'
export default {
  components: {
    SideMenu
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    logout() {
      this.$api.auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.hheader {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  .logout {
    cursor: pointer;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;

  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
