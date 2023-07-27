<template>
  <div class="app-container">
    <h1 style="text-align: center;">Banner list</h1>

    <!--select conditions-->
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="bannerQuery.title"
          placeholder="banner Title" />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getList()">Search</el-button>
      <el-button
        type="default"
        @click="resetData()">Reset</el-button>
    </el-form>

    <!-- Tools button -->
    <div class="add_btn">
      <el-button
        v-if="hasPerm('banner.add')"
        type="danger"
        size="medium"
        @click="addBanner()">Add</el-button>
    </div>

    <!-- Table -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row>
      <el-table-column
        label="No."
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        label="Banner Title"
        width="200" />

      <el-table-column
        prop="sort"
        label="Sort"
        width="100" />

      <el-table-column
        prop="gmtCreate"
        label="Create Time"
        width="160" />

      <el-table-column
        label="Modify"
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/cms/banner/save/'+scope.row.id">
            <el-button
              v-if="hasPerm('banner.update')"
              type="primary"
              size="mini"
              icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button
            v-if="hasPerm('banner.remove')"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 10, 50]"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="getList" />

  </div>
</template>

<script>
import banner from '@/api/banner'

export default {
  data() {
    return {
      listLoading: true, // loading
      list: null, // banner list
      page: 1, // current page in pagination
      limit: 5, // limit page in pagination
      total: 0, // total page in pagination
      bannerQuery: { // search obj
        title: ''
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    // get banner list with pagination
    getList(page = 1) {
      this.page = page
      this.listLoading = true
      banner
        .getBannerListPage(this.page, this.limit, this.bannerQuery)
        .then((response) => {
          // response from back-end api
          // console.log(response)
          if (response.success === true) {
            this.list = response.data.items
            this.total = response.data.total
          }
          this.listLoading = false
          // console.log(this.list)
          // console.log(this.total)
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: `${error}`
          })
        })
    },

    // reset
    resetData() { // reset all conditions for this table
      this.bannerQuery = {}
      this.getList()
    },

    // add banner
    addBanner() {
      this.$router.push({ path: '/cms/banner/save' })
    },

    // delete banner method
    removeDataById(id) {
      this.$confirm('This will permanently delete this banner. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // call delete banner method
        banner.deleteBannerId(id)
          .then(response => { // success to delete banner by id
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            this.getList()
          })
        // notice message
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Fail to delete!'
          })
        }
      })
    },

    // Change size in pagination
    handleSizeChange(limit) {
      this.limit = limit
      this.getList()
    }
  }
}
</script>
<style>
.add_btn {
  margin: 10px;
}
</style>
