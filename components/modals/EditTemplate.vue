<template>
  <div>
    =={{ form.aeUrl }}]]
    <a-modal
      :visible="visible"
      title="Add stream"
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
        <a-form-model-item ref="ae" label="AE file" prop="ae">
          <upload-item
            v-model="form.aeUrl"
            :action-url="actionUrl"
            accept=".aep"
          />
        </a-form-model-item>

        <a-form-model-item ref="jsonname" label="JSON file" prop="json">
          <upload-item
            v-model="form.jsonUrl"
            :action-url="jsonActionUrl"
            accept=".json"
          />
        </a-form-model-item>

        <a-form-model-item label="Activity form" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            Create
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            Reset
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import UploadItem from '~/components/uploadItem'
export default {
  components: {
    UploadItem
  },
  props: ['visible', 'templateId'],
  data() {
    return {
      form: {
        aeUrl: null
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change'
          }
        ],
        date1: [
          { required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    actionUrl() {
      // ${this.$api.getApiUrl()}
      return `/templates/${this.templateId}/upload/ae`
    },
    jsonActionUrl() {
      // ${this.$api.getApiUrl()}
      return `/templates/${this.templateId}/upload/json`
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style></style>
