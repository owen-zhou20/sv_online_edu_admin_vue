<template>
  <div class="app-container">
    <!--Menu list-->
    <el-header style="text-align: center; font-size: 30px">
      Menu list
    </el-header>
    <!--Search
    <el-input v-model="filterText" placeholder="Menu Name" style="margin-bottom:30px;"/>
    -->
    <!-- tree -->
    <el-table
      :data="menuList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all>
      <el-table-column
        prop="name"
        label="Name"
        width="280"/>
      <el-table-column
        prop="path"
        label="Path"
        width="260"/>
      <el-table-column
        prop="component"
        label="Component"
        width="260"/>
      <el-table-column
        prop="permissionValue"
        label="PermissionValue"/>
      <el-table-column
        label="Modify">
        <template slot-scope="scope">
          <!-- v-if="node.level == 1 || node.level == 2" v-if="node.level == 3" v-if="node.level == 4"-->
          <!-- This is a button if node.level == 4 .  This is a menu if node.level !== 4 .  This is the root menu if node.level == 1 .-->
          <!-- Add menu and get pid-->
          <el-button
            v-if="(scope.row.level == 1 || scope.row.level == 2) && hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="() => {dialogFormVisible = true, menu.pid = scope.row.id}">Add menu
          </el-button>
          <!-- Add Button and get pid-->
          <el-button
            v-if="scope.row.level == 3 && hasPerm('permission.add')"
            type="text"
            size="mini"
            @click="() => {dialogPermissionVisible = true, permission.pid = scope.row.id}">Add Button
          </el-button>
          <!-- Modify Button-->
          <el-button
            v-if="scope.row.level == 4 && hasPerm('permission.update')"
            type="text"
            size="mini"
            @click="() => updateButton(scope.row)">Modify Button
          </el-button>
          <!-- Modify Menu-->
          <el-button
            v-if="scope.row.level != 4 && scope.row.level != 1 && hasPerm('permission.update')"
            type="text"
            size="mini"
            @click="() => updateMenu(scope.row)">Modify Menu
          </el-button>
          <!-- Delete-->
          <el-button
            v-if="scope.row.level != 1 && hasPerm('permission.remove')"
            type="text"
            size="mini"
            @click="() => remove(scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Add / Modify menu -->
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormValue">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="Menu Name" prop="name">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="Path" prop="path">
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="Component" prop="component">
          <el-input v-model="menu.component"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData()">Cancel</el-button>
        <el-button type="primary" @click="appendMenu()">Confirm</el-button>
      </div>
    </el-dialog>

    <!-- Add / Modify button -->
    <el-dialog :visible.sync="dialogPermissionVisible" title="Add / Modify Button">
      <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="150px">
        <el-form-item label="Button Name" prop="name">
          <el-input v-model="permission.name"/>
        </el-form-item>
        <el-form-item label="Path">
          <el-input v-model="permission.path"/>
        </el-form-item>
        <el-form-item label="Conponent">
          <el-input v-model="permission.component"/>
        </el-form-item>
        <el-form-item label="Permission Value" prop="permissionValue">
          <el-input v-model="permission.permissionValue"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData()">Cancel</el-button>
        <el-button type="primary" @click="appendButton()">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import menu from '@/api/acl/menu'

const menuForm = { // Menu
  name: '',
  pid: 0,
  path: '',
  component: '',
  type: '1'
}
const perForm = {
  permissionValue: '',
  type: '2',
  name: '',
  path: '',
  component: '',
  pid: 0
}

export default {

  data() {
    return {
      filterText: '', // Search menu name
      menuList: [], // menuList tree data
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormValue: 'Add / Modify menu',
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      menu: menuForm,
      permission: perForm,
      menuValidateRules: { // Menu Validate Rules
        name: [{ required: true, trigger: 'blur', message: 'Must have a menu name!' }],
        path: [{ required: true, trigger: 'blur', message: 'Must have a path! (E.g. "teacher/add")' }],
        component: [{ required: true, trigger: 'blur', message: 'Must have a component! (E.g. "/edu/teacher/add")' }]
      },
      permissionValidateRules: { // Button Validate Rules
        name: [{ required: true, trigger: 'blur', message: 'Must have a button name!' }],
        permissionValue: [{ required: true, trigger: 'blur', message: 'Must have a permission value! (E.g. "teacher.delete")' }]
      }
    }
  },
  // Search Listener from element-ui
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },

  // create
  created() {
    this.fetchNodeList()
  },

  methods: {
    // Show menu list
    fetchNodeList() {
      menu.getNestedTreeList().then(response => {
        if (response.success === true) {
          this.menuList = response.data.children
          console.log(this.menuList)
        }
      })
    },

    // search from element-ui
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },

    // Remove a menu by id
    remove(data) {
      console.log(data)

      this.$confirm('This will permanently delete the menu. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return menu.removeById(data.id)
      }).then(() => {
        this.fetchNodeList() // refresh
        this.$message({
          type: 'success',
          message: 'Delete completed!!'
        })
      }).catch((response) => { // fail
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },

    // Add / Modify a button (node.level == 4)
    appendButton() {
      this.$refs.permission.validate(valid => {
        if (valid) {
          if (this.permission.id) {
            this.update(this.permission) // Modify button
          } else {
            menu.saveLevelOne(this.permission).then(response => { // Add node.level == 4 button
              this.dialogPermissionVisible = false
              this.$message({
                type: 'success',
                message: 'Success to add a button!'
              })
              // refresh
              this.fetchNodeList()
              // clear menu to default
              this.menu = { ...menuForm }
              this.permission = { ...perForm }
            })
          }
        }
      })
    },

    // add level 1 menu
    appendLevelOne() {
      menu.saveLevelOne(this.menu)
        // success
        .then(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: 'Success to add this level 1 menu!'
          })
          // refresh
          this.fetchNodeList()
          // clear menu to default
          this.menu = { ...menuForm }
          this.permission = { ...perForm }
        })
        // fail
        .catch(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: 'Fail to add this level 1 menu!!'
          })
          // clear menu to default
          this.menu = { ...menuForm }
          this.permission = { ...perForm }
        })
    },

    // Add / Modify a menu (node.level !== 4)
    appendMenu() {
      this.$refs.menu.validate(valid => {
        if (valid) {
          if (!this.menu.id) { // Add
            if (this.menu.pid == 0) { // node.level == 1 (this.menu.pid == 0)
              this.appendLevelOne() // Add node.level == 2 menu
            } else {
              this.appendLevelTwo() // Add node.level == 3 menu
            }
          } else { // Modify
            this.update(this.menu)
          }
        }
      })
    },

    // update a menu
    update(obj) {
      // debugger
      menu.update(obj).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: 'Update success!'
        })
        // refresh
        this.fetchNodeList()
        this.resetData()
      })
    },

    // add level 2 menu
    appendLevelTwo() {
      menu.saveLevelOne(this.menu)
        // success
        .then(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: 'Success to add this level 2 menu!'
          })
          // refresh
          this.fetchNodeList()
          // clear menu to default
          this.menu = { ...menuForm }
          this.permission = { ...perForm }
        })
        // fail
        .catch(response => {
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: 'Fail to add this level 1 menu!'
          })
          // clear menu to default
          this.menu = { ...menuForm }
          this.permission = { ...perForm }
        })
    },

    // show modify menu
    updateMenu(data) {
      this.dialogFormVisible = true
      this.menu = data
    },

    // show modify menu
    updateButton(data) {
      this.dialogPermissionVisible = true
      this.permission = data
    },

    // reset
    resetData() {
      this.dialogPermissionVisible = false
      this.dialogFormVisible = false
      this.menu = { ...menuForm }
      this.permission = { ...perForm }
    }
  }
}
</script>
