<template>
  <div class="app-container">
    <!--Role Information-->
    <el-header style="text-align: center; font-size: 30px">
      Role Information
    </el-header>
    <el-form
      ref="role"
      :model="role"
      :rules="validateRules"
      label-width="120px">
      <el-form-item
        label="Role Name"
        prop="roleName">
        <el-input v-model="role.roleName" />
      </el-form-item>
      <el-form-item>
        <el-button @click="Cancel()">Cancel</el-button>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import roleApi from '@/api/acl/role'

const defaultForm = {
  roleName: ''
}

export default {
  data() {
    return {
      role: defaultForm,
      saveBtnDisabled: false, // save betton
      validateRules: {
        roleName: [{ required: true, trigger: 'blur', message: 'Must have a role name!' }]
      }
    }
  },

  // listener
  watch: {
    $route(to, from) {
      // console.log('route change......')
      // console.log(to)
      // console.log(from)
      this.init()
    }
  },

  // create
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // init form
    init() {
      debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // copy role
        this.role = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.$refs.role.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // defend submit twice
          if (!this.role.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // add a role
    saveData() {
      roleApi.save(this.role).then(response => {
        // debugger
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/role/list' })
        }
      })
    },

    // update role by id
    updateData() {
      // update role by id
      roleApi.updateById(this.role).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/role/list' })
        }
      })
    },

    // get a role info by user id
    fetchDataById(id) {
      roleApi.getById(id).then(response => {
        this.role = response.data.item
      })
    },

    // Cancel
    Cancel() {
      this.role = { ...defaultForm }
      this.$router.push({ path: '/acl/role/list' })
    }
  }
}
</script>
