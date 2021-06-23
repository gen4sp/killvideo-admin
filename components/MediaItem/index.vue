<template>
  <div
    class="media-item noselect"
    :class="{ hover }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="clickHandler"
  >
    <div v-if="data && data.preview" style="width:100%; height:100%;">
      <ImageMediaItem v-if="typeObj.type === 'image'" :data="data" />
      <AudioMediaItem v-else-if="typeObj.type === 'audio'" :data="data" />
      <DefaultMediaItem v-else :data="data" />
    </div>
    <NoPreviewPlaceholder v-else />
    <div class="media-icon" :style="iconStyle" />
  </div>
</template>

<script>
import ImageMediaItem from './Image'
import AudioMediaItem from './Audio'
import DefaultMediaItem from './Default'
import NoPreviewPlaceholder from './NoPreviewPlaceholder'
import MediaTypeIconService from '~/services/mediatypeIcon.service.js'

export default {
  components: {
    ImageMediaItem,
    AudioMediaItem,
    DefaultMediaItem,
    NoPreviewPlaceholder
  },
  props: ['data'],
  data() {
    return {
      hover: false
    }
  },
  computed: {
    iconStyle() {
      // return {"backgroundImage": `url (${this.typeObj.icon})`}
      return { backgroundImage: `url("${this.typeObj.icon}")` }
    },
    typeObj() {
      return MediaTypeIconService.getType(this.data.mediatype)
    }
  },
  methods: {
    clickHandler() {
      this.$emit('selected', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.media-item {
  display: flex;
  flex-direction: row;
  width: 200px;
  height: 120px;
  background-color: #333;
  // padding: 8px;
  margin: 4px;
  cursor: pointer;
  position: relative;
  &.hover {
    background-color: #444;
  }
  .media-icon {
    position: absolute;
    width: 28px;
    height: 40px;
    bottom: 2px;
    right: 2px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('/sdfds');
  }
}
</style>
