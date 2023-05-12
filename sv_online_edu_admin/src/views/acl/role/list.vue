<template>
  <div class="app-container">
    <!--Role list-->
    <el-header style="text-align: center; font-size: 30px">
      Role list
    </el-header>
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="searchObj.roleName"
          placeholder="Role Name" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="fetchData()">Search</el-button>
      <el-button
        type="default"
        @click="resetData()">Reset</el-button>
    </el-form>

    <!-- Tools button -->
    <div>
      <el-button
        v-if="hasPerm('role.add')"
        type="danger"
        size="mini"
        @click="addUser()">Add</el-button>
      <el-button
        v-if="hasPerm('role.remove')"
        type="danger"
        size="mini"
        @click="batchRemove()">Batch Delete</el-button>

    </div>

    <!-- Role List -->
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

      <el-table-column
        prop="roleName"
        label="Role Name" />

      <el-table-column
        label="Modify"
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/acl/role/distribution/'+scope.row.id">
            <el-button
              v-if="hasPerm('role.assgin')"
              type="info"
              size="mini"
              icon="el-icon-info" />
          </router-link>
          <router-link :to="'/acl/role/update/'+scope.row.id">
            <el-button
              v-if="hasPerm('role.update')"
              type="primary"
              size="mini"
              icon="el-icon-edit" />
          </router-link>
          <el-button
            v-if="hasPerm('role.remove')"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)" />
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
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import roleApi from '@/api/acl/role'

export default {
  data() {
    return {
      listLoading: true, // Loading...
      list: null, // roleList
      total: 0, // total records
      page: 1, // default page
      limit: 10, // page limit
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
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },

    // add a role
    addUser() {
      this.$router.push({ path: '/acl/role/add' })
    },

    // get roleList and show
    fetchData(page = 1) {
      // ajax
      this.page = page

      roleApi.getPageList(this.page, this.limit, this.searchObj)
        .then(
          response => {
            this.list = response.data.items
            this.total = response.data.total

            this.listLoading = false
          }
        )
    },

    // reset
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    // delete a role by roleId
    removeDataById(id) {
      // debugger
      this.$confirm('This will permanently delete the role. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => { // promise
        // ajax
        return roleApi.removeById(id)
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
      }

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
          // console.log(idList)
        })
        // batch delete rows by idList
        return roleApi.batchRemove(idList)
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
</script>

