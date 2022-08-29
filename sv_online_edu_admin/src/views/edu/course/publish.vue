<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps :active="3"
              process-status="wait"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline" />
      <el-step title="Release new course" />
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>Course Title: {{ coursePublish.title }}</h2>
        <p class="gray"><span>Total {{ coursePublish.lessonNum }} lessons</span></p>
        <p><span>OneSubject: {{ coursePublish.subjectLevelOne }} —— Twosubject: {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>Teacher Name: {{ coursePublish.teacherName }}</p>
        <p />

        <h3 class="red">Price: $ {{ coursePublish.price }}</h3>
        <h4 class="green">Publish status: {{ coursePublish.status }}</h4>

      </div>
    </div>
    <div>
      <el-button type="info"
                 @click="previous"
                 icon="el-icon-d-arrow-left">Previous</el-button>
      <el-button :disabled="saveBtnDisabled"
                 type="success"
                 @click="SaveDraft">Save as draft</el-button>
      <el-button :disabled="saveBtnDisabled"
                 type="primary"
                 @click="publish">Publish this course</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: '',
      coursePublish: {}
    }
  },
  created() {
    // Get course id from route address
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
    }

    // Call getCoursePublishId() to get publish course info
    this.getCoursePublishId()
  },
  methods: {
    // Get publish course info by course id
    getCoursePublishId() {
      course.getPublishCourseInfo(this.courseId)
        .then(response => {
          this.coursePublish = response.data.publishCourse
        })
    },
    previous() {
      // Go to previous step
      this.$router.push({ path: '/course/chapter/' + this.courseId })
    },
    publish() {
      // Publish this new course
      course.publishCourse(this.courseId)
        .then(response => {
          var rs = response.code
          if (rs == 20000) {
            this.$message({
              type: 'success',
              message: 'Success to publish this course!'
            })
            this.$router.push({ path: '/course/list' })
          } else {
            this.$message({
              type: 'error',
              message: 'Fail to publish this course!'
            })
          }
        })
    },
    // Save course as a draft
    SaveDraft() {
      course.draftCourse(this.courseId)
        .then(response => {
          var rs = response.code
          if (rs == 20000) {
            this.$message({
              type: 'success',
              message: 'Success to modify this course as draft!'
            })
            this.$router.push({ path: '/course/list' })
          } else {
            this.$message({
              type: 'error',
              message: 'Fail to modify this course as draft!'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 10px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
.ccInfo .main h4 {
  left: 540px;
  bottom: 20px;
  line-height: 3;
  font-size: 24px;
  color: grey;
  font-weight: normal;
  position: absolute;
}
</style>
