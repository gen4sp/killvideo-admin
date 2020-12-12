<template>
  <div>
    <div v-if="value">
      <a @click="openPreview">{{ value }}</a>
      <a-button @click="removeHandle">
        <a-icon :type="'delete'" />
      </a-button>
    </div>

    <a-upload
      v-else
      name="file"
      :multiple="false"
      :accept="accept"
      :file-list="fileList"
      :action="actionUrl"
      :custom-request="upload"
      :remove="removeHandle"
    >
      <a-button :loading="loading" :disabled="loading">
        <a-icon :type="'upload'" />
        {{ value ? 'uploaded' : loading ? 'Uploadinig...' : 'Click to Upload' }}
      </a-button>
    </a-upload>
  </div>
</template>

<script>
export default {
  props: ['actionUrl', 'accept', 'value'],
  data() {
    return {
      valueUrl: null,
      fileList: [],
      loading: false
    }
  },
  computed: {
    aeUploaded() {
      return this.fileList.length > 0
    }
  },
  mounted() {
    if (this.value) {
      this.fileList = this.value
    }
  },
  methods: {
    openPreview() {
      const url = this.c || `http://cdn.killvideo.tv/${this.value}`
      window.open(url, '_blank')
    },
    removeHandle(file) {
      this.fileList = []
      this.$emit('remove')
      this.$emit('input', null)
    },
    handleRemove(file) {
      this.fileList = []
    },
    upload(info) {
      this.loading = true
      return this.$api.upload(info.file, info.action).then((res) => {
        this.loading = false
        console.log(' >>> ', res)
        console.log('=== ', res.data.files, res.data.files[0])
        this.valueUrl = `http://cdn.killvideo.tv/${res.data.files[0].path}`
        this.$emit('uploaded', res.data.files[0].path)
        this.$emit('input', res.data.files[0].filename)
      })
    }
  }
}
</script>

<style></style>
