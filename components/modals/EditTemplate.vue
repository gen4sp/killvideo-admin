<template>
  <a-modal
    :visible="visible"
    title="Add or edit template"
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
      <a-form-model-item ref="title" label="Title" prop="title">
        <a-input v-model="form.title" placeholder="Title" />
      </a-form-model-item>

      <a-form-model-item ref="visibility" label="Visibility" prop="visibility">
        <div style="display:flex;">
          <a-select v-model="form.visibility" style="width: 120px">
            <a-select-option value="public">
              public
            </a-select-option>
            <a-select-option value="private">
              private
            </a-select-option>
            <a-select-option value="hidden">
              hidden
            </a-select-option>
          </a-select>

          <a-select
            v-if="form.visibility === 'private'"
            v-model="form.userIds"
            placeholder="User IDs who can see"
            mode="tags"
          >
          </a-select>
        </div>
      </a-form-model-item>

      <a-form-model-item label="AE file" prop="aeUrl">
        <upload-item
          v-model="form.aeUrl"
          :action-url="actionUrl('ae')"
          accept=".aep"
          @uploaded="uploadedHanlde('ae', $event)"
        />
      </a-form-model-item>

      <a-form-model-item label="JSON file" prop="jsonUrl">
        <upload-item
          v-model="form.jsonUrl"
          :action-url="actionUrl('json')"
          accept=".json"
        />
      </a-form-model-item>

      <a-form-model-item label="Cover image" prop="coverUrl">
        <upload-item
          v-model="form.coverUrl"
          :action-url="actionUrl('cover')"
          accept=".jpeg"
        />
      </a-form-model-item>

      <a-form-model-item label="Video preview" prop="previewUrl">
        <upload-item
          v-model="form.previewUrl"
          :action-url="actionUrl('preview')"
          accept=".mp4"
        />
      </a-form-model-item>

      <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          Create
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item> -->
    </a-form-model>
  </a-modal>
</template>

<script>
import _ from 'lodash'
import UploadItem from '~/components/uploadItem'

const defaultFormValues = {
  title: null,
  id: null,
  aeUrl: null,
  jsonUrl: null,
  coverUrl: null,
  previewUrl: null,
  visibility: 'public'
}

export default {
  components: {
    UploadItem
  },
  props: ['visible', 'template'],
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

      if (val && this.template) {
        this.form.title = this.template.title
        this.form.id = this.template.id

        this.form.aeUrl = this.template.ae_path
        this.form.jsonUrl = this.template.json_path
        this.form.coverUrl = this.template.poster
        this.form.previewUrl = this.template.preview

        if (
          this.template.visibility === 'public' ||
          this.template.visibility === 'hidden'
        ) {
          this.form.visibility = this.template.visibility
        } else {
          this.form.visibility = 'private'
          this.form.userIds = this.template.visibility.split(',')
        }
      }
      console.log('zz', val, this.template, this.form)
    }
  },
  methods: {
    prepareFormData() {
      const res = {}
      res.title = this.form.title

      res.ae_path = this.form.aeUrl
      res.json_path = this.form.jsonUrl
      res.poster = this.form.coverUrl
      res.preview = this.form.previewUrl

      res.id = this.form.id

      if (
        this.form.visibility === 'public' ||
        this.form.visibility === 'hidden'
      ) {
        res.visibility = this.form.visibility
      } else {
        res.visibility = this.form.userIds.join(',')
      }
      return res
    },
    uploadedHanlde(type, file) {
      // console.log('uh', type, file)
      return (a, b) => {}
    },
    actionUrl(type) {
      // ${this.$api.getApiUrl()}
      return this.template
        ? `/templates/${this.template.id}/upload/${type}`
        : `/templates/temp/upload/${type}`
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
