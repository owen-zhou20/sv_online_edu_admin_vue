<template>
  <div class="app-container">
    <h1 style="text-align: center;">Create statistics data</h1>
    <!--Table-->
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item label="Day">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="Pick a day"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        v-if="hasPerm('daily.add')"
        :disabled="btnDisabled"
        type="primary"
        @click="create()">Create</el-button>
    </el-form>
  </div>
</template>

<script>
import sta from '@/api/statistics'
export default {
  data() {
    return {
      day: '',
      btnDisabled: false
    }
  },
  methods: {
    create() {
      this.btnDisabled = true
      sta.createStaData(this.day)
        .then(response => {
          this.btnDisabled = false
          // notice
          this.$message({
            type: 'success',
            message: 'Success to create data!'
          })
          // go to show.vue
          this.$router.push({ path: '/statistics/show' })
        })
    }
  }

}
</script>
