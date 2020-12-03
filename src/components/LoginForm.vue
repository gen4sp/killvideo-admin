<template>
    <div class="login-form">
        <h2>Login</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Username">
                <el-input v-model="form.name" placeholder="admin"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="form.pwd" placeholder="1234"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button id="login" type="primary" @click="onLogin">Proceed</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      visible: false
    };
  },
  methods: {
    onLogin() {
      this.$emit('on-login', this.form.name, this.form.pwd)
      // if (this.form.name == "root" && this.form.pwd == "123") {
      //   document.removeEventListener("keydown", this.keydownFn);
      //   this.$router.push("/home");
      // } else if (this.form.name != "root") {
      //   this.$message.error("请输入合法的用户名！");
      // } else {
      //   this.$message.error("密码输入错误！");
      // }
    },
    keydownFn(evt) {
      evt.keyCode == 13 && this.onLogin();
    }
  },
  mounted() {
    let _this = this;
    document.addEventListener("keydown", this.keydownFn, false);
  }
};
</script>

<style lang="less" scoped>
.login-form {
  background-color: #e9eef3;
  padding: 15px 30px;
  border-radius: 5px;
  h2 {
    text-align: center;
  }
}
</style>
