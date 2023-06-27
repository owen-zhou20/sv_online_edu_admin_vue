<template>
  <div class="app-container">
    <h1 style="text-align: center;">Add subject</h1>
    <el-form label-width="120px">
      <el-form-item label="Information">
        <!--Excel model-->
        <el-tag type="info">Excel model</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="'/static/template.xlsx'">Click to download a template excel file</a>
        </el-tag>
      </el-form-item>
      <!--Upload Excel-->
      <el-form-item label="Select Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/addSubject'"
          name="file"
          accept="application/.xlsx">
          <el-button
            slot="trigger"
            size="small"
            type="primary">Select file</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API, // Base api
      fileUploadBtnText: 'Upload a file to the service', // upload button text
      importBtnDisabled: false, // upload button,
      loading: false
    }
  },
  created() {

  },
  methods: {
    // Click upload file butten to upload file to API
    submitUpload() {
      this.fileUploadBtnText = 'Uploading...'
      this.importBtnDisabled = true
      this.loading = true
      // submit() form: upload
      // js: document.getElementById("upload").submit()
      this.$refs.upload.submit()
    },
    // Upload success
    fileUploadSuccess(response) {
      // Notice success message
      if (response.success === true) {
        this.fileUploadBtnText = 'Upload success!'
        this.loading = false
        this.$message({
          type: 'success',
          message: 'Success to add all subjects!'
        })
      }
      // show subject list
      this.$router.push({ path: '/edu/subject/list' })
    },
    // Upload fail
    fileUploadError() {
      // Notice fail message
      this.fileUploadBtnText = 'Upload fail!'
      this.loading = false
      this.$message({
        type: 'error',
        message: 'Fail to add subjects!'
      })
    }

  }
}
</script>

