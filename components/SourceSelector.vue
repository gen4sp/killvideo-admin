<template>
  <div>
    <div v-if="source">
      ={{ source }}= <a-button @click="clearSource">x</a-button>
    </div>
    <a-form-model
      v-else
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- Source type -->
      <a-form-model-item label="Type" prop="type">
        <a-select v-model="form.type" placeholder="please select source type">
          <a-select-option value="youtube">
            YouTube
          </a-select-option>
          <a-select-option value="reddit">
            Reddit
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <!-- Source link -->
      <a-form-model-item label="Link" required prop="link">
        <a-input :disabled="!form.type" v-model="form.link" />
      </a-form-model-item>

      <!-- RULES -->

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          Submit
        </a-button>
        <!-- <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button> -->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: ['source'],
  data() {
    return {
      labelCol: { span: 1 },
      wrapperCol: { span: 14 },
      form: {
        type: 'youtube',
        link: 'https://www.youtube.com/channel/UCnxGkOGNMqQEUMvroOWps6Q'
      },
      rules: {
        link: [
          {
            required: true,
            message: 'Please input URL to the source',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: 'Please select source type',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    handleOk(e) {
      console.log(e)
      this.$emit('onClose', {})
    },
    handleCancel(e) {
      this.$emit('onClose')
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$axios.$post('/sources', this.form).then((res) => {
            this.loading = false
            this.$emit('onSelect', res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clearSource() {
      this.$emit('onSelect', null)
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style></style>
