<template>
  <div class="app-container">
    <!--User Information-->
    <el-header style="text-align: center; font-size: 30px">
      User Information
    </el-header>
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
      <el-form-item label="User Name" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="Nick Name">
        <el-input v-model="user.nickName"/>
      </el-form-item>

      <el-form-item v-if="!user.id" label="Password" prop="password">
        <el-input v-model="user.password" type="password"/>
      </el-form-item>

      <el-form-item>
        <el-button @click="Cancel()">Cancel</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/acl/user'

const defaultForm = {
  username: '',
  nickName: '',
  password: ''
}

// valid username and password
const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('Password must more than 6 characters!'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      user: defaultForm,
      saveBtnDisabled: false, // save betton
      validateRules: { // valid username and password
        username: [{ required: true, trigger: 'blur', message: 'Must have a username' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
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
    this.init()
  },

  methods: {

    // init form
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // cpoy user
        this.user = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // defend submit twice
          if (!this.user.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // add a user
    saveData() {
      userApi.save(this.user)
        .then(response => {
          if (response.success) {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.$router.push({ path: '/acl/user/list' })
          }
        })
    },

    // update user by id
    updateData() {
      // update user by id
      userApi.updateById(this.user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    // get a user info by user id
    fetchDataById(id) {
      userApi.getById(id)
        .then(response => {
          this.user = response.data.item
        })
    },

    // Cancel
    Cancel() {
      this.user = { ...defaultForm }
      this.$router.push({ path: '/acl/user/list' })
    }

  }
}
</script>
