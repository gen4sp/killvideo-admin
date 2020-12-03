<template>
  <div style="height:100%">
    <el-table
            :data="allUsers"
            style="width: 100%"
    >

      <el-table-column
              fixed
              prop="createdAt"
              label="Created"
              width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left:10px">{{ formatDate(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>

      <el-table-column
              prop="username"
              label="Username"
      >
      </el-table-column>
      <el-table-column
              prop="roles"
              label="Roles"
              width="100"
      >
        <template slot-scope="scope">
          <el-tag v-for="role in scope.row.roles"
                  size="mini" :type="getRoleTagType(role)">{{ role }}</el-tag>
        </template>
      </el-table-column>
      <!---->
      <!--<el-table-column-->
              <!--prop="skippable"-->
              <!--label="Skippable"-->
              <!--align="center"-->
              <!--width="120">-->
        <!--<template slot-scope="scope">-->
          <!--<check-cell :data="scope.row.skippable"></check-cell>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
          <el-input v-model="addOrEditForm.username"></el-input>
        </el-form-item>

        <el-form-item label="Password" v-if="!addOrEditForm.id">
          <el-input v-model="addOrEditForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="addOrEditForm.roles" multiple placeholder="Roles"  class="fullwidth">
            <el-option
                    v-for="item in userRoles"
                    :key="item"
                    :label="item"
                    :value="item">
            </el-option>
          </el-select>
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
  const defaultForm = {
    username: '',
    roles: ['USER']
  }

  export default {
    name: 'users',
    components: {
      checkCell
    },
    data () {
      return {
        allUsers: [],
        pageSize: 10,
        currentPage: 1,
        totalCount: null,
        userRoles: ['ADMIN', 'USER', 'VIEWER'],
        addOrEditForm: _.clone(defaultForm),
        formLabelWidth: 140,
        dialogFormVisible: false
      }
    },
    methods: {
      fetch(){
        api.users.all({
          offset:(this.currentPage-1)*this.pageSize,
          limit: this.pageSize
        })
          .then((data) => {
            this.allUsers = data.items;
            this.totalCount = data.count
          })
      },
      getRoleTagType(role){
        switch(role){
          case 'ADMIN':
            return 'success'
            break;
          case 'USER':
            return ''
            break;
          case 'VIEWER':
            return 'info'
            break;
        }
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
        api.users[mutation]({ userId: this.addOrEditForm.id, input: item })
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
