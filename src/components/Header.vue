<template>
  <div class="header">

    <el-dropdown split-button  @command="handleCommand" @click="gotoProfile" :show-timeout="0" :hide-timeout="300">
        {{user.username}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--<el-button icon="el-icon-more" circle></el-button>-->
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
export default {
  name: 'xheader',
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    gotoProfile(){
      this.$router.push('/profile')
    },
    handleCommand(cmd){
      console.log('cmd', cmd)
      switch(cmd){
        case 'logout':
          console.log('LL')
          this.logout()
          this.$router.push('/login')
          break;
        default:
          break;
      }

    }
  }
}
</script>

<style scoped>
.header {
    /*font-size: 32px;*/
    background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
