<template>
  <div>ok</div>
</template>

<style></style>
<script>
// import AuthService from '../../services/auth.service';

export default {
  name: 'PageLoggingIn',
  auth: false,
  layout: 'unauthed',
  // meta() {
  // 	return {
  // 		title: 'Logging in...',
  // 	};
  // },
  data() {
    return {
      authService: undefined
    }
  },
  async beforeMount() {
    console.log('this.$api.auth', this.$api.auth)
    this.authService = await this.$api.auth
    await this.authService.login(this.$route.params.token)
    await this.authService.handleAuthentication(this.$router)
  }
}
</script>
