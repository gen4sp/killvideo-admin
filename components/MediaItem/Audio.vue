<template>
  <div
    style="width:100%; height:100%; display:flex; justify-content: center; align-items:center; padding:4px;"
  >
    <audio ref="audioctrl" controls>
      <source :src="cdnUrl + data.preview" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>

<script>
import MediaTypeIconService from '~/services/mediatypeIcon.service.js'
export default {
  props: ['data'],
  data() {
    return {
      cdnUrl: 'http://cdn.killvideo.tv/'
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
  }
}
</script>

<style></style>
