<template>
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
          :action-url="actionUrl('ae')"
          accept=".aep"
          @uploaded="uploadedHanlde('ae', $event)"
        />
      </a-form-model-item>

      <a-form-model-item ref="json" label="JSON file" prop="json">
        <upload-item
          v-model="form.jsonUrl"
          :action-url="actionUrl('json')"
          accept=".json"
        />
      </a-form-model-item>

      <a-form-model-item ref="cover" label="Cover image" prop="cover">
        <upload-item
          v-model="form.coverUrl"
          :action-url="actionUrl('cover')"
          accept=".jpeg"
        />
      </a-form-model-item>

      <a-form-model-item ref="preview" label="Video preview" prop="preview">
        <upload-item
          v-model="form.previewUrl"
          :action-url="actionUrl('preview')"
          accept=".mp4"
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
</template>

<script>
import UploadItem from '~/components/uploadItem'
export default {
  components: {
    UploadItem
  },
  props: ['visible', 'template'],
  data() {
    return {
      form: {
        aeUrl: null,
        jsonUrl: null,
        coverUrl: null,
        previewUrl: null
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
  computed: {},
  watch: {
    visible(val) {
      if (val && this.template) {
        this.form.aeUrl = this.template.ae_path
        console.log('opened')
      }
    }
  },
  methods: {
    uploadedHanlde(type, file) {
      console.log('uh', type, file)
      return (a, b) => {}
    },
    actionUrl(type) {
      // ${this.$api.getApiUrl()}
      return this.template
        ? `/templates/${this.template.id}/upload/${type}`
        : ''
    },
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
