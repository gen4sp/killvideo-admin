<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="uploads"
      :loading="loading"
      row-key="id"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="preview" slot-scope="preview, record">
        <MediaItem v-if="record" :data="record" />
      </span>

      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>

      <span slot="mediatype" slot-scope="mediatype">
        <a-tag :color="getColor(mediatype)">
          {{ mediatype.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="record">
        <!-- <a @click="openEditTemplate(record)">Edit</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a> -->
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            Actions <a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="(key) => menuClickHandle(key, record)">
            <a-menu-item key="filterByUser">
              <a href="http://www.alipay.com/">Uploads by user</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="delete">
              Delete
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>

<script>
import MediaItem from '~/components/MediaItem'
import MediaTypeIconService from '~/services/mediatypeIcon.service.js'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'di'
  },
  {
    title: 'Title',
    dataIndex: 'preview',
    key: 'preview',
    scopedSlots: { customRender: 'preview' },
    width: 140
  },
  {
    title: 'Creator',
    dataIndex: 'owner',
    key: 'owner'
  },
  {
    title: 'Type',
    dataIndex: 'mediatype',
    key: 'mediatype',
    scopedSlots: { customRender: 'mediatype' }
  },

  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 190
  }
]
export default {
  components: {
    MediaItem
  },
  middleware: 'authguard',
  data() {
    return {
      loading: false,
      uploads: [],
      columns
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    menuClickHandle(action, record) {
      console.log('Action', action, record)
    },
    getColor(mediatype) {
      return MediaTypeIconService.getColor(mediatype)
    },
    fetch() {
      this.loading = true
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/uploads/'
        })
        .then((data) => {
          console.log('td ', data)
          this.loading = false
          this.uploads = data.data
        })
    }
  }
}
</script>

<style lang="scss">
.poster {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center center;
}
</style>
