<template>
  <div>
    <a-upload
      name="file"
      :multiple="false"
      :accept="accept"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :action="actionUrl"
      :custom-request="upload"
      :remove="removeHandle"
    >
      <a-button
        v-if="!aeUploaded"
        :loading="uploadingAE"
        :disabled="uploadingAE"
      >
        <a-icon type="upload" />
        {{
          aeUploaded
            ? 'uploaded'
            : uploadingAE
            ? 'Uploadinig...'
            : 'Click to Upload'
        }}
      </a-button>
    </a-upload>
  </div>
</template>

<script>
export default {
  props: ['actionUrl', 'accept', 'value'],
  data() {
    return {
      fileList: [],
      uploadingAE: false
    }
  },
  computed: {
    aeUploaded() {
      return this.fileList.length > 0
    }
  },
  mounted() {
    if (this.value) {
      this.fileList = [this.value]
    }
  },
  methods: {
    removeHandle(file) {
      this.fileList = []
      this.$emit('remove')
      this.$emit('input', null)
    },
    handleRemove(file) {
      this.fileList = []
    },
    beforeUpload(file) {
      this.fileList = [file]
      return true
    },
    upload(info) {
      this.uploadingAE = true
      return this.$api.upload(info.file, info.action).then((req, res) => {
        this.uploadingAE = false
        console.log(' >>> ', req, res)
        this.$emit('uploaded', req.data.files.path)
        this.$emit('input', req.data.files.path)
      })
    }
  }
}
</script>

<style></style>
