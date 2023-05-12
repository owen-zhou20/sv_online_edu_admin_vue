<template>
  <div class="app-container">
    <div style="padding: 20px 20px 0 20px;">
      Assign roles for user
    </div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange">All</el-checkbox>
    <div style="margin: 15px 0;" />
    <el-checkbox-group
      v-model="checkedRoleIds"
      @change="handleCheckedRolesChange">
      <el-checkbox
        v-for="role in roleList"
        :label="role.id"
        :key="role.id">{{ role.roleName }}</el-checkbox>
    </el-checkbox-group>
    </br>
    <el-button @click="Cancel()">Cancel</el-button>
    <el-button
      :disabled="saveBtnDisabled"
      type="primary"
      @click="update">Save</el-button>

  </div>
</template>

<script>

import userApi from '@/api/acl/user'

export default {
  data() {
    return {
      checkAll: false,
      checkedRoleIds: [], // checked role ids
      roleList: [], // all role list
      isIndeterminate: true, // checkbox state
      userId: '',
      saveBtnDisabled: false // save botten
    }
  },

  created() {
    this.init()
  },

  methods: {
    // init
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.userId = this.$route.params.id
        this.getById(this.userId)
      }
    },

    // get roleList for user
    getById(userId) {
      userApi.getAssign(userId).then(response => {
        var jsonObj = response.data.assignRoles
        this.checkedRoleIds = this.getJsonToList(jsonObj, 'id')
        this.roleList = response.data.allRolesList
      })
    },

    // json to string then to. get value by key
    getJsonToList(json, key) {
      // JSON to roleList
      var assRolesList = JSON.parse(JSON.stringify(json))
      // console.log('assRoleList---->', assRolesList)
      // var list = JSON.parse(json)
      var strText = []
      // get value by key
      for (var i = 0; i < assRolesList.length; i++) {
        strText.push(assRolesList[i][key])
      }
      return strText
    },

    // checked all
    handleCheckAllChange(val) {
      this.checkedRoleIds = val ? this.roleList : []
      this.isIndeterminate = false
    },

    // checked change
    handleCheckedRolesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roleList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length
    },

    update() {
      this.saveBtnDisabled = true // prevent submit twice
      var ids = this.checkedRoleIds.join(',') // json array
      // console.log(ids)
      // do assign
      userApi.saveAssign(this.userId, ids).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: 'Success to change!'
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    // Cancel
    Cancel() {
      this.checkedRoleIds = [], // checked role ids
      this.roleList = [], // all role list
      this.userId = '',
      this.$router.push({ path: '/acl/user/list' })
    }

  }
}
</script>
