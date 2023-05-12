<template>
  <div class="app-container">
    <h1 style="text-align: center;">Course list</h1>
    <!--select conditions for this table-->
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="courseQuery.title"
          placeholder="Course title" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="courseQuery.status"
          clearable
          placeholder="Course publish status">
          <el-option
            value="Normal"
            label="Published" />
          <el-option
            value="Draft"
            label="Draft(Not published)" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.gmt_create"
          type="datetime"
          placeholder="选择开始时间"
          format="dd-MM-yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getList()">Search</el-button>
      <el-button
        type="default"
        @click="resetData()">Reset</el-button>
    </el-form>

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
        width="80"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- <el-table-column type="index"
                       label="序号2"
                       width="50" /> -->

      <el-table-column
        prop="title"
        label="Title"
        width="200" />
      <el-table-column
        label="Course Publish status"
        width="80">
        <template slot-scope="scope">
          {{ scope.row.status==="Normal"?"Normal":"Draft" }}
        </template>
      </el-table-column>

      <el-table-column
        prop="lessonNum"
        label="Total lessons"
        width="80" />
      <el-table-column
        prop="gmtCreate"
        label="Create time"
        width="200" />
      <el-table-column
        prop="gmtModified"
        label="Last modify time"
        width="200" />
      <el-table-column
        prop="price"
        label="Price"
        width="80" />
      <el-table-column
        label="Management"
        width="240"
        align="center">
        <template slot-scope="scope">
          <div class="bg_btn">
            <router-link :to="'/course/courseinfo/'+scope.row.id">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit">Edit course infomation</el-button>
            </router-link>
          </div>
          <div class="bg_btn">
            <router-link :to="'/course/chapter/'+scope.row.id">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit">Edit course chapter</el-button>
            </router-link>
          </div>
          <div class="bg_btn">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeDataById(scope.row.id)">Delete course infomation</el-button>
          </div>
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
import course from '@/api/edu/course'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 3,
      total: 0,
      courseQuery: {
        title: '',
        status: '',
        gmt_create: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // get course list with pagination
    getList(page = 1) {
      this.page = page
      course
        .getCourseListPage(this.page, this.limit, this.courseQuery)
        .then((response) => {
          // response from back-end api
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          // console.log(this.list)
          // console.log(this.total)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetData() { // reset all conditions for this table
      this.courseQuery = {}
      this.getList()
    },
    // Delete course by course id
    removeDataById(id) {
      this.$confirm('This will permanently delete this course. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // call delete course method
        course.deleteCourseById(id)
          .then(response => { // success to delete course by id
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
            this.getList()
          })
        // notice message
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
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
.bg_btn {
  margin: 2px;
}
</style>
