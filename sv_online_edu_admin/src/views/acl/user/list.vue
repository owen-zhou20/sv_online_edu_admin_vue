<template>
  <div class="app-container">
    <!--User list-->
    <el-header style="text-align: center; font-size: 30px">
      User list
    </el-header>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.username" placeholder="User Name"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">Search</el-button>
      <el-button type="default" icon="el-icon-refresh" @click="resetData()">Reset</el-button>
    </el-form>

    <!-- Tools button -->
    <div>
      <el-button v-if="hasPerm('user.add')" type="danger" size="mini" @click="addUser()">Add</el-button>
      <el-button v-if="hasPerm('user.remove')" type="danger" size="mini" @click="batchRemove()">Batch Delete</el-button>
    </div>

    <!-- User List -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55" />

      <el-table-column
        label="No"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="User Name" width="200" />

      <el-table-column prop="nickName" label="Nick Name" width="200"/>

      <el-table-column prop="gmtCreate" label="Create Time" width="200"/>

      <el-table-column label="Modify" width="230" align="center">
        <template slot-scope="scope">
          <router-link :to="'/acl/user/role/'+scope.row.id">
            <el-button v-if="hasPerm('user.assgin')" type="warning" size="mini" icon="el-icon-info" title="Assign roles" />
          </router-link>
          <router-link :to="'/acl/user/update/'+scope.row.id">
            <el-button v-if="hasPerm('user.update')" type="primary" size="mini" icon="el-icon-edit" title="Modify" @click="updateUser(scope.row.id)"/>
          </router-link>
          <el-button v-if="hasPerm('user.remove')" type="danger" size="mini" icon="el-icon-delete" title="Delete" @click="removeDataById(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      :current-page.sync="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10, 20, 50]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import user from '@/api/acl/user'

export default {
  data() {
    return {
      listLoading: true, // Loading...
      list: null, // userList
      total: 0, // total records
      page: 1, // default page
      limit: 3, // page limit
      searchObj: {}, // searchObj
      multipleSelection: [] // batch select
    }
  },

  // created
  created() {
    this.fetchData()
  },

  // mounted
  mounted() {
  },

  methods: {

    // Change size for pagination select
    handleSizeChange(limit) {
      this.limit = limit
      this.fetchData()
    },

    // add a user
    addUser() {
      this.$router.push({ path: '/acl/user/add' })
    },

    // Update a user
    updateUser(id) {
      this.$router.push({ path: '/acl/user/update' + id })
      console.log('userId========>' + id)
    },

    // get userList and show
    fetchData(page = 1) {
      this.page = page
      // ajax
      user.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.listLoading = false
          this.list = response.data.items
          this.total = response.data.total
        }
        )
    },

    // reset
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    // delete a user by userId
    removeDataById(id) {
      // debugger
      this.$confirm('This will permanently delete the user. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // ajax
        user.removeById(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            // refresh
            this.fetchData(this.page)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },

    // handle multiple selection change
    handleSelectionChange(selection) {
      // console.log('handleSelectionChange......')
      // console.log(selection)
      this.multipleSelection = selection
    },

    // batch delete
    batchRemove() {
      // console.log('removeRows......')

      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: 'Please select rows!'
        })
        return
      } else {
        this.$confirm('This will permanently delete these roles. Continue?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => { // promise
        // ajax
        // Get id list for seleted records
          var idList = []
          this.multipleSelection.forEach(item => {
            idList.push(item.id)
          })
          // batch delete rows by idList
          return user.batchRemove(idList)
        }).then((response) => {
          // refresh
          this.fetchData(this.page)
          if (response.success) {
            this.$message({
              type: 'success',
              message: 'Delete completed!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled!'
          })
        })
      }
    }

  }
}
</script>

