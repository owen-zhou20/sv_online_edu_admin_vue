<template>
  <div class="app-container">
    <h1 style="text-align: center;">Add teacher</h1>
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort"
                         :min="0"
                         controls-position="right" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level"
                   clearable
                   placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1"
                     label="高级讲师" />
          <el-option :value="2"
                     label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"
                  :rows="10"
                  type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary"
                   icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
              v-show：是否显示上传组件
              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调 -->
        <image-cropper v-show="imagecropperShow"
                       :width="300"
                       :height="300"
                       :key="imagecropperKey"
                       :url="BASE_API+'/eduoss/fileoss'"
                       field="file"
                       @close="close"
                       @crop-upload-success="cropSuccess" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled"
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
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API, // get base_api from dev.env.js
      saveBtnDisabled: false
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route')
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
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getTeacherInfo(id)
      } else {
        this.teacher = {
          id: '',
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: ''
        }
      }
    },
    // select teacher info by id
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
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
            message: 'edit completed'
          })
          // return teacher list,  router jump
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // add teacher
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(Response => { // success add teacher
          // notice message
          this.$message({
            type: 'success',
            message: 'add completed'
          })
          // return teacher list,  router jump
          this.$router.push({ path: '/teacher/table' })
        })
    }
  }
}
</script>
