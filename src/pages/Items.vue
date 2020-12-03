<template>
  <div style="height:100%">

    <el-table
            :data="allItems"
            :default-sort = "defaultSort"
            @sort-change="onSortChange"
            @filter-change="onFilterChange"
            style="width: 100%"
    >

      <el-table-column
              fixed
              sortable="custom"
              prop="createdAt"
              label="Created"
              width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left:10px">{{ formatDate(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>

      <el-table-column
              prop="name"
              label="Name"
              width="160"
      >
      </el-table-column>
      <el-table-column
              prop="owner"
              column-key="owner.username"
              label="Owner"

      >
        <template slot-scope="scope">
          <span>{{scope.row.owner.username}}</span>
        </template>
      </el-table-column>

      <el-table-column
              :filters="statusFilters" filter-placement="bottom-end"
              prop="status"
              column-key="status"
              label="Status"
              width="100"
      >
        <template slot-scope="scope">
          <el-tag size="mini" :type="getStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
              fixed="right"
              label="Operations"
              width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetails(scope.row.id)">Details</el-button>
          <el-button type="text" size="small" @click="editObj(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @current-change="fetch"
            layout="prev, pager, next"
            :total="totalCount">
    </el-pagination>
    <el-button class="float-add-button" type="primary" icon="el-icon-edit" circle @click="openCreateOrEdit"></el-button>


    <el-dialog :title="addOrEditForm.id?'Edit':'Create'" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="addOrEditForm" label-width="160px">

        <el-form-item label="Name">
          <el-input v-model="addOrEditForm.name"></el-input>
        </el-form-item>

        <el-form-item>
          <select-remote-item type="users" field="username" v-model="addOrEditForm.owner"></select-remote-item>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <span v-if="addOrEditForm.id">Save</span>
            <span v-else>Create</span>
          </el-button>
          <el-button @click="cancelCreateOrEdit">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../api'
  import moment from 'moment'
  import _ from 'lodash'
  import checkCell from '../components/checkCell'
  import SelectRemoteItem from '../components/SelectRemoteItem'
  const defaultForm = {
    name: '',
    owner: null
  }

  export default {
    name: 'items',
    components: {
      checkCell,
      SelectRemoteItem
    },
    data () {
      return {
        allItems: [],
        statusFilters: [
          {
            text: 'NEW', value: 'NEW'
          },
          {
            text: 'SUBMITTED', value: 'SUBMITTED'
          },
          {
            text: 'APPROVED', value: 'APPROVED'
          },
          {
            text: 'REJECTED', value: 'REJECTED'
          },
          {
            text: 'BLOCKED', value: 'BLOCKED'
          }],
        defaultSort: {prop: 'createdAt', order: 'descending'},
        pageSize: 10,
        currentPage: 1,
        totalCount: null,
        addOrEditForm: _.clone(defaultForm),
        formLabelWidth: 140,
        dialogFormVisible: false
      }
    },
    methods: {
      fetch(){
        api.items.all({
          offset:(this.currentPage-1)*this.pageSize,
          limit: this.pageSize,
          sort: this.defaultSort,
          filter: _.chain(this.filters).map((v,k) => {
            return v.length>0?{prop:k, items:v}:null
          }).compact().value()
        })
          .then((data) => {
            this.allItems = data.items;
            this.totalCount = data.count
          })
      },
      getStatusTagType(role){
        switch(role){
          case 'NEW':
            return 'info'
            break;
          case 'SUBMITTED':
            return ''
            break;
          case 'APPROVED':
            return 'success'
            break;
          case 'REJECTED':
            return 'warning'
            break;
          case 'BLOCKED':
            return 'danger'
            break;
        }
      },
      onSortChange({prop, order}){
        this.defaultSort = {prop, order}
        this.fetch()
      },
      onFilterChange(value) {
        this.filters = value;
        this.currentPage = 1;
        this.fetch()
      },
      formatDate(date){
        return moment(date, 'x').format('lll')
      },
      editObj (obj) {
        this.addOrEditForm = _.clone(obj)
        this.dialogFormVisible = true
      },
      openCreateOrEdit () {
        this.addOrEditForm = _.clone(defaultForm)
        this.dialogFormVisible = true
      },
      cancelCreateOrEdit () {
        this.dialogFormVisible = false
        this.addOrEditForm = _.clone(defaultForm)
      },
      openDetails (id) {
        console.log('goto', id)
        this.$router.push(`/qs/${id}`)
      },
      onSubmit () {
        const mutation = this.addOrEditForm.id ? 'update' : 'create';
        let item = _.clone(this.addOrEditForm)
        item = _.omit(item, ['id', 'createdAt', 'updatedAt',  '__typename'])
        api.items[mutation]({ id: this.addOrEditForm.id, input: item })
          .then((result) => {
            console.log('mutation is done', result)
            this.cancelCreateOrEdit()
            this.fetch()
          })
        // questionnaire.frequency = Number(questionnaire.frequency)
        // questionnaire.maxRepetitions = Number(questionnaire.frequency)
        // questionnaire = _.omit(questionnaire, ['id', 'created', 'questionsCount', 'questions', '__typename'])
        // this.$apollo.mutate({
        //   mutation,
        //   variables: {
        //     questionnaire,
        //     id: this.addOrEditForm.id
        //   }
        // })
        //   .then((result) => {
        //     console.log('mutation is done', result)
        //     this.cancelCreateOrEdit()
        //     this.$apollo.queries.allUsers.refetch()
        //   })
      }
    },
    mounted(){
      //console.log('mtx',this.$apollo, gql)
      // this.$apollo.queries.allUsers.refetch()
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
