<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps :active="1"
              process-status="wait"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline" />
      <el-step title="Release new course" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title"
                  placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>
      <!-- 所属分类 TODO -->
      <!-- 课程讲师 TODO -->

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId"
                   placeholder="Please select a teacher">
          <el-option v-for="teacher in teacherList"
                     :key="teacher.id"
                     :label="teacher.name"
                     :value="teacher.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0"
                         v-model="courseInfo.lessonNum"
                         controls-position="right"
                         placeholder="请填写课程的总课时数" />
      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description"
                  placeholder=" " />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程价格">
        <el-input-number :min="0"
                         v-model="courseInfo.price"
                         controls-position="right"
                         placeholder="免费课程请设置为0元" /> 元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled"
                   type="primary"
                   @click="saveOrUpdate">Save and next</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: { // course entity
        title: '',
        subjectId: '',
        subjectParentId: '1557256647536111617',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0
      },
      teacherList: [] // teacher list
    }
  },
  created() {
    // Get teacher list when this page is created
    this.getListTeacher()
  },
  methods: {
    // Get all teacher list
    getListTeacher() {
      course.getListTeacher()
        .then(response => {
          this.teacherList = response.data.teacherList
        })
    },
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo)
        .then(response => {
          // Notice info
          this.$message({
            type: 'success',
            message: 'Success to add course infomation !'
          })
          // Go to next step
          this.$router.push({ path: '/course/chapter/' + response.data.courseId })
        })
    }
  }
}
</script>
