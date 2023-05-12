import request from '@/utils/request'

const api_name = '/admin/acl/permission'

export default {
  // Get all menus include children menus
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },
  // Delete all menus by menu id include children menus
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  // Add a menu
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: menu
    })
  },
  // Update a menu
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: menu
    })
  },
  // Get menus by a role id for assign
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },
  // Get menus by a role id for assign
  // getAssign(roleId) {
  // return request({
  // url: `${api_name}/toAssign/${roleId}`,
  //  method: 'get'
  // })
  // },
  // Do assign by a role id
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: { roleId, permissionId }
    })
  }
}
