import request from '@/utils/request'

export default {
  // Get code by mobile
  sendCode(phone) {
    return request({
      url: `/edumsm/msm/sendYisha/${phone}`,
      method: 'get'
    })
  },
  // Get code by mobile
  registerMember(formItem) {
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: formItem
    })
  }
} 