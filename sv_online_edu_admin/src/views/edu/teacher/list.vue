<template>
  <div class="app-container">
    <h1 style="text-align: center;">Teacher list</h1>

    <!--select conditions-->
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="teacherQuery.name"
          placeholder="Teacher Name" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="Level">
          <el-option
            :value="1"
            label="Normal Teacher" />
          <el-option
            :value="2"
            label="Head Teacher" />
        </el-select>
      </el-form-item>
      <el-form-item label="Create Time">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="Create time"
          format="dd-MM-yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="End time"
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

    <!-- Tools button -->
    <div>
      <el-button
        v-if="hasPerm('teacher.add')"
        type="danger"
        size="mini"
        @click="addTeacher()">Add</el-button>

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
        prop="name"
        label="Teacher Name"
        width="80" />
      <el-table-column
        label="Teacher Level"
        width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'Normal Teacher':'Head Teacher' }}
        </template>
      </el-table-column>

      <el-table-column
        prop="intro"
        label="Introduction" />
      <el-table-column
        prop="gmtCreate"
        label="Create Time"
        width="160" />
      <el-table-column
        prop="sort"
        label="Sort"
        width="60" />
      <el-table-column
        label="Modify"
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button
              v-if="hasPerm('teacher.update')"
              type="primary"
              size="mini"
              icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button
            v-if="hasPerm('teacher.remove')"
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
import teacher from '@/api/edu/teacher'

export default {
  data() {
    return {
      listLoading: true, // loading
      list: null, // teacher list
      page: 1, // current page in pagination
      limit: 3, // limit page in pagination
      total: 0, // total page in pagination
      teacherQuery: { // search obj
        name: '',
        level: '',
        begin: null,
        end: null
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    // get teaccher list with pagination
    getList(page = 1) {
      this.page = page
      this.listLoading = true
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          // response from back-end api
          // console.log(response)
          if (response.success === true) {
            this.list = response.data.rows
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
      this.teacherQuery = {}
      this.getList()
    },

    // add teacher
    addTeacher() {
      this.$router.push({ path: '/teacher/save' })
    },

    // delete teacher method
    removeDataById(id) {
      this.$confirm('This will permanently delete this teacher. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // call delete teacher method
        teacher.deleteTeacherId(id)
          .then(response => { // success to delete teacher by id
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
