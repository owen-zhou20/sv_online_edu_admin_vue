import request from '@/utils/request'

const api_name = '/admin/acl/user'

export default {

  // Pagination condition select user list
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // searchObj
    })
  },

  // Get a user info by user id
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  // Add a user
  save(user) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: user
    })
  },

  // Update a user by user id
  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },
  // Get roles by a user id for assign
  getAssign(userId) {
    return request({
      url: `${api_name}/toAssign/${userId}`,
      method: 'get'
    })
  },

  // Do assign by a user id
  saveAssign(userId, roleIds) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      params: { userId, roleIds }
    })
  },

  // Delete a user by user id
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  // Batch delete users by ids
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  }
}
