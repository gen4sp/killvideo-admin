<template>
  <div class="login">
    <login-form @on-login="onLogin"></login-form>
    <el-button @click="test">test </el-button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import api from '../api'
  import LoginForm from "../components/LoginForm.vue";

  export default {
    name: 'login',
    components: { LoginForm },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    methods:{
      ...mapActions({
        login: 'user/login'
      }),
      onLogin(username, password){
        api.auth.login({username, password})
          .then((res) => {
            this.$message.success('Success')
            return this.login(res)
          })
          .then(() => {
            this.$router.push('/')
          })
      },
      test(){
        api.users.all()
          .then((res) => {
            console.log(res)
            //store.save
            this.$message.success(res)
          })
      }
    }
  };
</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
}
</style>
