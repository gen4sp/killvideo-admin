<template>
  <div>
    <!-- <a-button @click="openEditTemplate()">+</a-button> -->
    <a-table :columns="columns" :data-source="templates" :loading="loading">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="img" slot-scope="text">
        <div
          class="poster"
          :style="{
            backgroundImage: `url('http://cdn.killvideo.tv/${text
              .split('\\')
              .join('\\\\')}')`
          }"
        ></div>
      </span>
      <span slot="checkbox" slot-scope="record">
        <a-checkbox :default-checked="Boolean(record)" disabled></a-checkbox>
      </span>
      <span slot="action" slot-scope="record">
        <a @click="openEditTemplate(record)">Edit</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
    <EditUser
      :template="selectedTemplate"
      :visible="editTemplateModalShown"
      @onClose="EditTemplateModalOnCloseHandle"
    />
  </div>
</template>

<script>
import EditUser from '~/components/modals/EditUser'
const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'ID',
    width: 140
  },
  {
    title: 'createdAt',
    dataIndex: 'created_at',
    key: 'created_at'
    // scopedSlots: { customRender: 'checkbox' }
  },
  {
    title: 'updatedAt',
    dataIndex: 'updated_at',
    key: 'updated_at'
    // scopedSlots: { customRender: 'checkbox' }
  },
  {
    title: 'works_done',
    dataIndex: 'works_done',
    key: 'works_done'
    // scopedSlots: { customRender: 'checkbox' }
  },
  {
    title: 'errors',
    dataIndex: 'errors',
    key: 'errors'
    // scopedSlots: { customRender: 'checkbox' }
  }
  // {
  //   title: 'Action',
  //   key: 'action',
  //   scopedSlots: { customRender: 'action' },
  //   width: 190
  // }
]
export default {
  components: {
    EditUser
  },
  middleware: 'authguard',
  data() {
    return {
      loading: false,
      selectedTemplate: null,
      editTemplateModalShown: false,
      templates: [],
      columns
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    EditTemplateModalOnCloseHandle(data) {
      console.log(' O ', data)
      if (!data) {
        this.closeEditTemplate()
        return
      }
      if (data.id) {
        this.$api
          .apiCall({
            method: 'POST',
            url: `/templates/${data.id}`,
            data
          })
          .then((data) => {
            console.log('td edit', data)
            this.closeEditTemplate()
            this.fetch()
          })
      } else {
        this.$api
          .apiCall({
            method: 'POST',
            url: '/templates/',
            data
          })
          .then((data) => {
            console.log('td creatre ', data)
            this.closeEditTemplate()
          })
      }

      // this.selectedTemplate = null
      // this.editTemplateModalShown = false
      // console.log('> ', data)
    },
    closeEditTemplate() {
      this.selectedTemplate = null
      this.editTemplateModalShown = false
    },
    openEditTemplate(template) {
      this.selectedTemplate = template
      this.editTemplateModalShown = true
      console.log('sfs', template)
    },

    fetch() {
      this.loading = true
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/workers/'
        })
        .then((data) => {
          console.log('td ', data)
          this.loading = false
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
