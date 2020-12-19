<template>
  <div>
    <!-- <a-button @click="openEditTemplate()">+</a-button> -->
    <a-table :columns="columns" :data-source="users" :loading="loading">
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
        <a @click="openEditUser(record)">Edit</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="deleteUser(record)">Delete</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
    <EditUser
      :user="selectedUser"
      :visible="editUserModalShown"
      @onClose="EditUserModalOnCloseHandle"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import EditUser from '~/components/modals/EditUser'
const columns = [
  {
    dataIndex: 'id',
    key: 'id',

    width: 140
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'admin',
    dataIndex: 'admin',
    key: 'admin',
    scopedSlots: { customRender: 'checkbox' }
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
    EditUser
  },
  middleware: 'authguard',
  data() {
    return {
      loading: false,
      selectedUser: null,
      editUserModalShown: false,
      users: [],
      columns
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    deleteUser(data) {
      console.log(' >> ', data)
      this.$api
        .apiCall({
          method: 'DELETE',
          url: `/users/${data.id}`
        })
        .then((data) => {
          console.log('del', data)
          this.closeEditUser()
          this.fetch()
        })
    },
    EditUserModalOnCloseHandle(data) {
      console.log(' O ', data)
      if (!data) {
        this.closeEditUser()
        return
      }
      if (data.id) {
        this.$api
          .apiCall({
            method: 'PATCH',
            url: `/users/${data.id}`,
            data: _.omit(data, 'id')
          })
          .then((data) => {
            console.log('td edit', data)
            this.closeEditUser()
            this.fetch()
          })
      } else {
        this.$api
          .apiCall({
            method: 'POST',
            url: '/users/',
            data
          })
          .then((data) => {
            console.log('td creatre ', data)
            this.closeEditUser()
          })
      }

      // this.selectedTemplate = null
      // this.editTemplateModalShown = false
      // console.log('> ', data)
    },
    closeEditUser() {
      this.selectedUser = null
      this.editUserModalShown = false
    },
    openEditUser(user) {
      this.selectedUser = user
      this.editUserModalShown = true
      console.log('sfs', user)
    },

    fetch() {
      this.loading = true
      return this.$api
        .apiCall({
          method: 'GET',
          url: '/users/'
        })
        .then((data) => {
          console.log('td ', data)
          this.loading = false
          this.users = data.data
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
