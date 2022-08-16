<template>
  <div class="app-container">
    <h2 style="text-align: center;">Release new course</h2>
    <el-steps :active="2"
              process-status="wait"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="Fill in this course infomation" />
      <el-step title="Create course outline" />
      <el-step title="Release new course" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">Previous</el-button>
        <el-button :disabled="saveBtnDisabled"
                   type="primary"
                   @click="next">Save and next</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveBtnDisabled: false
    }
  },
  created() {

  },
  methods: {
    previous() {
      // Go to previous step
      this.$router.push({ path: '/course/courseinfo/1' })
    },
    next() {
      // Go to next step
      this.$router.push({ path: '/course/publish/1' })
    }
  }
}
</script>
