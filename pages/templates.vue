<template>
  <div>
    <a-table :columns="columns" :data-source="templates">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="img" slot-scope="text">
        <div
          class="poster"
          :style="{
            backgroundImage: `url('https://killvideo.tv/${text
              .split('\\')
              .join('\\\\')}')`
          }"
        ></div>
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="record">
        <a @click="openEditTemplate(record.id)">Edit</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
    <EditTemplate
      :template-id="selectedTemplateId"
      :visible="editTemplateModalShown"
    />
  </div>
</template>

<script>
import EditTemplate from '~/components/modals/EditTemplate'
const columns = [
  {
    dataIndex: 'poster',
    key: 'poster',
    scopedSlots: { customRender: 'img' },
    width: 140
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Renders',
    dataIndex: 'count',
    key: 'count'
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
    EditTemplate
  },
  middleware: 'authguard',
  data() {
    return {
      selectedTemplateId: null,
      editTemplateModalShown: false,
      templates: [],
      columns
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    openEditTemplate(templateId) {
      this.selectedTemplateId = templateId
      this.editTemplateModalShown = true
      console.log('sfs', templateId)
    },
    gotoNewChannel() {
      this.$router.push('/channel/')
    },
    fetch() {
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/templates/'
        })
        .then((data) => {
          console.log('td ', data)
          this.templates = data.data
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
