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
      <span slot="timediff" slot-scope="record">
        <span>
          <dot :state="getTimeDiff(record, false) ? 'on' : 'off'"></dot>
          {{ getTimeDiff(record, true) }}</span
        >
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
import moment from 'moment'
import Dot from '~/components/Dot'
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
    key: 'updated_at',
    scopedSlots: { customRender: 'timediff' }
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
    EditUser,
    Dot
  },
  middleware: 'authguard',
  data() {
    return {
      serverTimeDiff: 0,
      loading: false,
      selectedTemplate: null,
      editTemplateModalShown: false,
      templates: [],
      columns
    }
  },
  mounted() {
    this.getSystemTime()
    this.fetch()
  },
  methods: {
    getTimeDiff(date, text) {
      const now = new Date().getTime()
      const upd = new Date(date).getTime()
      const diff = now - upd - this.serverTimeDiff
      if (!text) {
        return diff < 10000
      }
      if (diff < 10000) {
        return Math.round(diff / 1000) + ' sec '
      } else {
        return 'Down ' + moment(date).fromNow()
      }
    },
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
    getSystemTime() {
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/system/time'
        })
        .then((res) => {
          console.log(res)
          const now = new Date().getTime()
          this.serverTimeDiff = now - res.time
        })
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
