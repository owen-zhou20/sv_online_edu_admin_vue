<template>
  <div class="app-container">
    <h1 style="text-align: center;">Course list</h1>
    <!--select conditions for this table-->
    <el-form
      :inline="true"
      class="demo-form-inline">

      <!-- Subject -->
      <!-- One subject -->
      <el-form-item label="Course subject">
        <el-select
          v-model="searchObj.subjectParentId"
          placeholder="One subject"
          @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in oneSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <!-- Two subject -->
        <el-select v-model="searchObj.subjectId" placeholder="Two subject">
          <el-option
            v-for="subjectTwo in twoSubjectList"
            :key="subjectTwo.id"
            :label="subjectTwo.title"
            :value="subjectTwo.id"/>
        </el-select>
      </el-form-item>
      <!-- Course title -->
      <el-form-item>
        <el-input
          v-model="courseQuery.title"
          placeholder="Course title" />
      </el-form-item>
      <!-- Course publish status -->
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
      <!-- Teacher -->
      <el-form-item>
        <el-select
          v-model="searchObj.teacherId"
          placeholder="Choose a teacher">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <!-- Create time -->
      <el-form-item label="Create time">
        <el-date-picker
          v-model="courseQuery.gmt_create"
          type="datetime"
          placeholder="Create time"
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
              @click="removeDataById(scope.row.id)">Delete course</el-button>
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
import teacher from '@/api/edu/teacher'
import subject from '@/api/edu/subject'

export default {
  data() {
    return {
      listLoading: true,
      list: null,
      page: 1,
      limit: 3,
      total: 0,
      courseQuery: {
        title: '',
        teacherId: '',
        status: '',
        subjectParentId: '',
        subjectId: '',
        gmt_create: null
      },
      teacherList: [], // Teacher List
      oneSubjectList: [], // One Subject List
      twoSubjectList: [] // Two Subject List
    }
  },
  created() {
    this.getList()
    this.initTeacherList()
    this.initSubjectList()
  },
  methods: {
    // get course list with pagination
    getList(page = 1) {
      this.listLoading = true
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
          this.listLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // init teacher list
    initTeacherList() {
      teacher.getListTeacher()
        .then((response) => {
          this.teacherList = response.data.teacherList
        })
    },
    // init subject list
    initSubjectList() {
      subject.getSubjectList()
        .then((response)={
          this.oneSubjectList = response.data.list
        })
    },
    // handle one subject change
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.oneSubjectList.length; i++) {
        if (this.oneSubjectList[i].id === value) {
          this.twoSubjectList = this.oneSubjectList[i].children
          this.searchObj.subjectId = ''
        }
      }
    },
    resetData() { // reset all conditions for this table
      this.courseQuery = {}
      this.twoSubjectList = []
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
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
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
.bg_btn {
  margin: 2px;
}
</style>
