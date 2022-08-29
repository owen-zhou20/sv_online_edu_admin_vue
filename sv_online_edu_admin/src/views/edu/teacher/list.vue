<template>
  <div class="app-container">
    <h1 style="text-align: center;">Teacher list</h1>
    <!--select conditions for this table-->
    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name"
                  placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level"
                   clearable
                   placeholder="讲师头衔">
          <el-option :value="1"
                     label="高级讲师" />
          <el-option :value="2"
                     label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker v-model="teacherQuery.begin"
                        type="datetime"
                        placeholder="选择开始时间"
                        format="dd-MM-yyyy HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="teacherQuery.end"
                        type="datetime"
                        placeholder="选择截止时间"
                        format="dd-MM-yyyy HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00" />
      </el-form-item>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getList()">Search</el-button>
      <el-button type="default"
                 @click="resetData()">Reset</el-button>
    </el-form>

    <!-- Table -->
    <el-table v-loading="listLoading"
              :data="list"
              element-loading-text="Loading..."
              border
              fit
              highlight-current-row>
      <el-table-column label="序号"
                       width="70"
                       align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- <el-table-column type="index"
                       label="序号2"
                       width="50" /> -->

      <el-table-column prop="name"
                       label="名称"
                       width="80" />
      <el-table-column label="头衔"
                       width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro"
                       label="资历" />
      <el-table-column prop="gmtCreate"
                       label="添加时间"
                       width="160" />
      <el-table-column prop="sort"
                       label="排序"
                       width="60" />
      <el-table-column label="操作"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-delete"
                     @click="removeDataById(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination :current-page="page"
                   :page-size="limit"
                   :total="total"
                   style="padding: 30px 0; text-align: center;"
                   layout="total, prev, pager, next, jumper"
                   @current-change="getList" />

  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 3,
      total: 0,
      teacherQuery: {
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
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          // response from back-end api
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetData() { // reset all conditions for this table
      this.teacherQuery = {}
      this.getList()
    },
    // delete teacher method
    removeDataById(id) {
      this.$confirm('This will permanently delete this teacher record. Continue?', 'Warning', {
        confirmButtonText: 'OK',
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    }
  }
}
</script>
