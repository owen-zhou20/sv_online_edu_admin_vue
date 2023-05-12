import request from '@/utils/request'

// Login
export function login(username, password) {
  // debugger
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// Get user info
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// logout did by TokenLogoutHandler
export function logout() {
  // debugger
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

// Get menus for auth for this user
export function getMenu() {
  return request({
    url: '/admin/acl/index/menu',
    method: 'get'
  })
}
