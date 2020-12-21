<template>
  <a-modal
    :visible="visible"
    title="Edit user"
    ok-text="Save"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- NAME -->
      <a-form-model-item ref="email" label="Email" prop="email">
        <a-input v-model="form.email" placeholder="Title" />
      </a-form-model-item>

      <a-form-model-item ref="admin" label="Role" prop="admin">
        <div style="display:flex;">
          <a-select v-model="form.admin" style="width: 120px">
            <a-select-option value="true">
              Admin
            </a-select-option>
            <a-select-option value="false">
              User
            </a-select-option>
          </a-select>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import _ from 'lodash'

const defaultFormValues = {
  email: null,
  admin: null
}

export default {
  components: {},
  props: ['visible', 'user'],
  data() {
    return {
      form: _.clone(defaultFormValues),
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      rules: {
        title: [
          {
            required: true,
            message: 'Please input a title',
            trigger: 'blur'
          }
        ],
        visibility: [
          {
            required: true,
            message: 'Please select a visibility',
            trigger: 'change'
          }
        ],
        aeUrl: [
          { required: true, message: 'Please pick a file', trigger: 'change' }
        ],
        jsonUrl: [
          { required: true, message: 'Please pick a file', trigger: 'change' }
        ],
        coverUrl: [
          { required: true, message: 'Please pick a file', trigger: 'change' }
        ],
        previewUrl: [
          { required: true, message: 'Please pick a file', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    visible(val) {
      this.resetForm()

      if (val && this.user) {
        this.form.email = this.user.email
        this.form.admin = '' + this.user.admin
      }
      console.log('zz', val, this.user, this.form)
    }
  },
  methods: {
    prepareFormData() {
      const res = {}
      res.email = this.form.email
      res.admin = this.form.admin === 'true'
      if (this.user.id) {
        res.id = this.user.id
      }

      return res
    },
    handleOk(e) {
      this.onSubmit()
    },
    handleCancel(e) {
      this.$emit('onClose')
    },

    onSubmit() {
      console.log(' == ', this.form)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const proceessedForm = this.prepareFormData()
          console.log('pf', proceessedForm)
          this.$emit('onClose', proceessedForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
    }
  }
}
</script>

<style></style>
