<template>
  <div class="app-container">
    <h1 style="text-align: center;">Add teacher</h1>
    <el-form label-width="120px">
      <el-form-item label="Teacher Name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="Sort">
        <el-input-number
          v-model="teacher.sort"
          :min="0"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="Teacher Level">
        <el-select
          v-model="teacher.level"
          clearable
          placeholder="Choose teacher level">
          <el-option
            :value="1"
            label="Normal Teacher" />
          <el-option
            :value="2"
            label="Head Teacher" />
        </el-select>
      </el-form-item>
      <el-form-item label="Career">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="Introduction">
        <el-input
          v-model="teacher.intro"
          :rows="10"
          type="textarea" />
      </el-form-item>

      <!-- Upload Teacher Avatar -->
      <el-form-item label="Teacher Avatar">
        <pan-thumb :image="teacher.avatar" />
        <!-- File upload button -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow=true">Change avatar
        </el-button>
        <!--
              v-show：show upload component
              :key：id
              :url：url
              @close：close upload component
              @crop-upload-success：success callback -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/uploadOssFile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess" />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: { // teacher Obj
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      imagecropperShow: false, // show upload component
      imagecropperKey: 0, // avatar key
      BASE_API: process.env.BASE_API, // get base_api from dev.env.js
      saveBtnDisabled: false // save button
    }
  },
  // watch url change and init page
  watch: {
    $route(to, from) {
      // console.log('watch $route')
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {

    close() { // close the message box for upload the avatar
      this.imagecropperShow = false
      // reset upload component
      this.imagecropperKey = this.imagecropperKey + 1
    },

    cropSuccess(data) { // after success to upload the avatar
      this.teacher.avatar = data.url
      this.imagecropperShow = false
      // reset upload component
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // init teacher data. get this teacher info if url has a teacher id
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getTeacherInfo(id)
        this.saveBtnDisabled = false
      } else {
        this.teacher = {
          id: '',
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: 'https://sv-edu-online.oss-ap-southeast-2.aliyuncs.com/02.jpg'
        }
        this.saveBtnDisabled = false
      }
    },

    // select teacher info by id
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: 'Fail to get teacher!'
          })
        })
    },

    // save button
    saveOrUpdate() {
      this.saveBtnDisabled = true
      // edit or add teacher info base id in teacher
      // edit teacher info if teacher id is not null
      if (this.teacher.id) {
        // edit teacher info if teacher id is not null
        this.updateTeacher(this.teacher)
      } else {
        // add teacher if teacher id is null
        this.saveTeacher()
      }
    },

    // edit teacher
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => { // success edit teacher
          // notice message
          this.$message({
            type: 'success',
            message: 'Edit completed'
          })
          // return teacher list,  router jump
          this.saveBtnDisabled = false
          this.$router.push({ path: '/edu/teacher/list' })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: 'Fail to update!'
          })
        })
    },

    // add teacher
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => { // success add teacher
          // notice message
          this.$message({
            type: 'success',
            message: 'Add completed'
          })
          // return teacher list,  router jump
          this.saveBtnDisabled = false
          this.$router.push({ path: '/edu/teacher/list' })
        }).catch((response) => {
        // console.log(response)
          this.$message({
            type: 'error',
            message: 'Add failed!'
          })
        })
    }
  }
}
</script>
