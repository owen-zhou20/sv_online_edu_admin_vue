import request from '@/utils/request'

export default {
  // 1. Course subject list
  getSubjectList() {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  }
}
