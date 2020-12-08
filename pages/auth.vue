<template>
  <div class="container">
    <div class="panel">
      <div style="text-align: center">
        <h3>Welcome to KillVideo.tv</h3>

        <h5>Enter your email to recieve a link to log in.</h5>
        <br />
      </div>
      <AuthFormLoginPass @onDone="handleAuthDone" />
    </div>
  </div>
</template>

<script>
import AuthFormLoginPass from '../components/forms/AuthFormLoginPass'
export default {
  auth: false,
  layout: 'unauthed',
  components: {
    AuthFormLoginPass
  },
  methods: {
    handleAuthDone(success) {
      if (success) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.panel {
  padding: 30px 40px 0px 40px;

  border-radius: 6px;
  width: 480px;
  border: 2px solid #8189a0;
  -webkit-box-shadow: 0px 16px 36px 2px rgba(38, 71, 163, 0.26);
  box-shadow: 0px 16px 36px 2px rgba(38, 71, 163, 0.26);
}
</style>
