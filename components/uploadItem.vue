<template>
  <div>
    <div v-if="value">
      <a @click="openPreview">{{ shortValue }}</a>
      <div>
        <div
          v-if="previewType === 'image'"
          class="preview image"
          :style="{
            backgroundImage: `url(http://cdn.killvideo.tv/${value})`
          }"
        ></div>
        <video
          v-else-if="previewType === 'video'"
          class="preview"
          width="320"
          height="240"
          controls
        >
          <source :src="`http://cdn.killvideo.tv/${value}`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <JsonViewer
          v-else-if="previewType === 'json'"
          :url="`http://cdn.killvideo.tv/${value}`"
        ></JsonViewer>
      </div>
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
import _ from 'lodash'
import JsonViewer from '~/components/JsonViewer'
export default {
  components: {
    JsonViewer
  },
  props: ['actionUrl', 'accept', 'value', 'previewType'],
  data() {
    return {
      valueUrl: null,
      fileList: [],
      jsonValue: {},
      loading: false
    }
  },
  computed: {
    aeUploaded() {
      return this.fileList.length > 0
    },
    shortValue() {
      return _.takeRight(this.value.split('/'))[0]
    }
  },
  mounted() {
    if (this.value) {
      this.fileList = this.value
    }
  },
  methods: {
    openPreview() {
      const url = this.valueUrl || `http://cdn.killvideo.tv/${this.value}`
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
        this.$emit('input', res.data.files[0].path)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 200px;
  &.image {
    background-size: contain;
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
