<template>
  <a-form-model ref="formInline" :rules="rules" :model="formInline">
    <a-form-model-item prop="email">
      <a-input v-model="formInline.email" placeholder="Email" size="large">
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item prop="password">
      <a-input
        v-model="formInline.password"
        size="large"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        block
        :disabled="formInline.email === '' || formInline.password === ''"
        @click="handleSubmit"
      >
        Log in
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { mapMutations } from 'vuex'
const emailRegex = /^\S+@\S+\.\S+$/
const validateEmail = (rule, value, callback) => {
  if (!emailRegex.test(value)) {
    return callback(new Error('Please input valid email address'))
  }
  console.log('x')
  // this.$refs.formInline.clearValidate('email');
  console.log('x2')
  // this.$nextTick(() => {
  console.log('x23')
  callback()
  // });
}
export default {
  data() {
    return {
      formInline: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            validator: validateEmail,
            message: 'Please enter valid email address',
            trigger: 'change'
          }
        ],
        password: [
          {
            min: 4,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(e) {
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          this.$api
            .apiCall({
              method: 'POST',
              url: '/auth/login',
              data: this.formInline
            })
            .then(({ data }) => {
              console.log('Q', data)
              if (data.status !== 'success') {
                return
              }
              console.log('Q2', this.formInline, data)
              this.emailSent = true
              this.$api.auth.setSession({
                username: this.formInline.email,
                token: data.token
              })
              console.log(data)
              console.log(this.$api.auth)
              this.$emit('onDone', true)
              // Email sent! Please check your inbox.
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapMutations({
      setUser: 'user/setUser'
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.formInline.validate()
      // To disabled submit button at the beginning.
    })
  }
}
</script>

<style></style>
