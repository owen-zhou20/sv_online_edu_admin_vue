<template>
  <div style="margin: 20px 20px">
    <div style="padding: 20px 20px 0 20px;">
      Assign menus for role
    </div>

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current />
    <el-button @click="Cancel()">Cancel</el-button>
    <el-button
      :disabled="saveBtnDisabled"
      type="primary"
      @click="save">Save</el-button>
  </div>
</template>
<script>
import menu from '@/api/acl/menu'

export default {
  data() {
    return {
      saveBtnDisabled: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId: ''

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

    // init
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.roleId = this.$route.params.id
        this.fetchDataById(this.roleId)
      }
    },

    // Get menus by a role id for assign
    fetchDataById(roleId) {
      menu.toAssign(roleId).then(response => {
        this.data = response.data.children
        var jsonList = JSON.parse(JSON.stringify(this.data))
        var list = [] // list: checked node ids
        this.getJsonToList(list, jsonList[0]['children']) // "jsonList[0]['children']" (get root menus)
        // console.log('Final list')
        // console.log(list)
        this.setCheckedKeys(list)
      })
    },

    // recursion to get all selected children menuIds
    getJsonToList(list, jsonList) { // list: checked node ids
      // get value by key
      for (var i = 0; i < jsonList.length; i++) {
        if (jsonList[i]['select'] == true && jsonList[i]['level'] == 4) {
          list.push(jsonList[i]['id'])
        }
        if (jsonList[i]['children'] != null) {
          this.getJsonToList(list, jsonList[i]['children'])
        }
      }
    },

    // get checkedNode id include parentNode id
    // getCheckedNodes() {
    // console.log(this.$refs.tree.getCheckedNodes())
    // },

    // get checked nodes id include parentNode id
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },

    // set checked nodes id include parentNode id
    setCheckedKeys(list) {
      this.$refs.tree.setCheckedKeys(list)
    },

    save() {
      this.saveBtnDisabled = true
      var ids = this.$refs.tree.getCheckedKeys().join(',')
      // vue elementUI tree
      // node_modules\element-ui\lib\element-ui.common.js
      // 25348 line modified
      menu.doAssign(this.roleId, ids).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: 'Success to change!'
          })
          this.$router.push({ path: '/acl/role/list' })
        }
      })
    },

    // Cancel
    Cancel() {
      this.roleId = ''
      this.$router.push({ path: '/acl/role/list' })
    }
  }
}
</script>
