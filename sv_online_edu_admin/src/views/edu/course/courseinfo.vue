<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps :active="1"
              process-status="wait"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline (chapters and videos)" />
      <el-step title="Release new course" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label=" 课程标题">
        <el-input v-model="courseInfo.title"
                  placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- Course subject-->
      <el-form-item label="Course subject">
        <!-- one subject-->
        <el-select v-model="courseInfo.subjectParentId"
                   placeholder="Level one subject"
                   style="width:260px"
                   @change="subjectLevelOneChanged">
          <el-option v-for="subject in subjectOneList"
                     :key="subject.id"
                     :label="subject.title"
                     :value="subject.id" />
        </el-select>
        <!-- two subject-->
        <el-select v-model="courseInfo.subjectId"
                   placeholder="Level two subject"
                   style="width:260px">
          <el-option v-for="subject in subjectTwoList"
                     :key="subject.id"
                     :label="subject.title"
                     :value="subject.id" />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId"
                   placeholder="Please select a teacher"
                   style="width:260px">
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

      <!-- CourseInfo description-->
      <el-form-item label="Course information description">
        <tinymce :height="300"
                 v-model="courseInfo.description" />
      </el-form-item>

      <!-- Course information avatar -->
      <el-form-item label="Course information avatar">
        <el-upload :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   :action="BASE_API+'/eduoss/fileoss'"
                   class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

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
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' // TextEdit component

export default {
  components: { Tinymce }, // TextEdit component
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: { // course entity
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0
      },
      courseId: '',
      teacherList: [], // teacher list
      subjectOneList: [], // one subject list
      subjectTwoList: [], // two subject list
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    // Get course id from route address
    if (this.$route.params && this.$route.params.id) { // Modify coirse info by course id
      this.courseId = this.$route.params.id
      // Show course info if get course id form route address
      this.getInfo()
    } else { // Add new course
      this.courseInfo = { // course entity
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0
      }
      // Get teacher list when this page is created
      this.getListTeacher()
      // Get one subject list when this page is created
      this.getOneSubject()
    }
  },
  methods: {
    // find course info by course id
    getInfo() {
      course.getCourseInfoById(this.courseId)
        .then(response => {
          this.courseInfo = response.data.courseInfoVo
          // 1. Get all onesubject list and twosubject list
          subject.getSubjectList()
            .then(response => {
              // Get all onesubject list
              this.subjectOneList = response.data.list
              //
              for (var i = 0; i < this.subjectOneList.length; i++) {
                // Get all onesubject list
                var oneSubject = this.subjectOneList[i]
                // Get all twosubjects base onesubject id from courseinfo
                if (this.courseInfo.subjectParentId == oneSubject.id) {
                  this.subjectTwoList = oneSubject.children
                }
              }
              // Get teacher list when this page is created
              this.getListTeacher()
            })
        })
    },
    //

    // After success to upload avatar
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    // before upload avatar
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // Get two subject and show when one subject is changed
    subjectLevelOneChanged(value) { // value is the Id for this one subject
      for (var i = 0; i < this.subjectOneList.length; i++) {
        var oneSubject = this.subjectOneList[i]
        if (oneSubject.id == value) {
          this.subjectTwoList = oneSubject.children
          this.courseInfo.subjectId = ''
        }
      }
    },
    // Get all one subject
    getOneSubject() {
      subject.getSubjectList()
        .then(response => {
          this.subjectOneList = response.data.list
        })
    },
    // Get all teacher list
    getListTeacher() {
      course.getListTeacher()
        .then(response => {
          this.teacherList = response.data.teacherList
        })
    },
    // Add course
    addCourse() {
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
    },
    // Modify course
    updateCourse() {
      course.updateCourseInfo(this.courseInfo)
        .then(response => {
          // Notice info
          this.$message({
            type: 'success',
            message: 'Success to modify course infomation !'
          })
          // Go to next step
          this.$router.push({ path: '/course/chapter/' + this.courseId })
        })
    },
    saveOrUpdate() {
      // if (!this.courseId) {
      if (!this.courseInfo.id) {
        // Add course info
        this.addCourse()
      } else {
        // Modify course info
        this.updateCourse()
      }
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
