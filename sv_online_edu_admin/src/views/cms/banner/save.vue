<template>
  <div class="app-container">
    <h1 style="text-align: center;">Add Banner</h1>
    <el-form label-width="120px">
      <el-form-item label="Banner Title">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="Sort">
        <el-input-number
          v-model="banner.sort"
          :min="0"
          controls-position="right" />
      </el-form-item>

      <!-- Upload Banner ImageUrl -->
      <el-form-item label="Banner Image">
        <pan-thumb :image="banner.imageUrl" />
        <!-- File upload button -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow=true">Change banner image
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
import bannerApi from '@/api/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: { // banner Obj
        title: '',
        sort: 0,
        imageUrl: ''
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
      this.banner.avatar = data.url
      this.imagecropperShow = false
      // reset upload component
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // init banner data. get this banner info if url has a banner id
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getBannerInfo(id)
        this.saveBtnDisabled = false
      } else {
        this.banner = { // banner Obj
          title: '',
          sort: 0,
          imageUrl: ''
        }
        this.saveBtnDisabled = false
      }
    },

    // select banner info by id
    getBannerInfo(id) {
      bannerApi.getBannerInfo(id)
        .then(response => {
          this.banner = response.data.banner
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: 'Fail to get banner!'
          })
        })
    },

    // save button
    saveOrUpdate() {
      this.saveBtnDisabled = true
      // edit or add banner info base id in banner
      // edit banner info if banner id is not null
      if (this.banner.id) {
        // edit banner info if banner id is not null
        this.updateBanner(this.banner)
      } else {
        // add banner if banner id is null
        this.saveBanner()
      }
    },

    // edit banner
    updateBanner() {
      bannerApi.updateBannerInfo(this.banner)
        .then(response => { // success edit banner
          // notice message
          this.$message({
            type: 'success',
            message: 'Edit completed'
          })
          // return banner list,  router jump
          this.saveBtnDisabled = false
          this.$router.push({ path: '/cms/banner/list' })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: 'Fail to update!'
          })
        })
    },

    // add banner
    saveBanner() {
      bannerApi.addBanner(this.banner)
        .then(response => { // success add banner
          // notice message
          this.$message({
            type: 'success',
            message: 'Add completed'
          })
          // return banner list,  router jump
          this.saveBtnDisabled = false
          this.$router.push({ path: '/cms/banner/list' })
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
