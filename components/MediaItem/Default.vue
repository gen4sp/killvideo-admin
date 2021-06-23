<template>
  <div>
    <div class="media-icon" :style="iconStyle"></div>
    <div style="padding:8px;">
      #{{ data.id }}. {{ typeObj.type }} - {{ data.filepath }} -{{ iconPath }}
    </div>
  </div>
</template>

<script>
import MediaTypeIconService from '~/services/mediatypeIcon.service.js'
export default {
  props: ['data'],
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
