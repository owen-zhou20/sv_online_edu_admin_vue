import request from '@/utils/request'

export default {
  // Login
  submitLoginUser(userInfo) {
    return request({
      url: `/educenter/member/login`,
      method: 'post',
      data: userInfo
    })
  },
  // Get user info by token
  getLoginUserInfo() {
    return request({
      url: `/educenter/member/getMemberInfo`,
      method: 'get'
    })
  },
  // Get QR code
  getLoginQrcode() {
    return request({
      url: `/api/ucenter/wx/login`,
      method: 'get'
    })
  }
} 