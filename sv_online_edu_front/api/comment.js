import request from '@/utils/request'

export default {
  // pagination select comment list
  getPageList(page, limit, courseId) {
    return request({
      url: `/eduservice/commentfront/${page}/${limit}`,
      method: 'get',
      params: { courseId }
    })
  },
  // Add a comment
  addComment(comment) {
    return request({
      url: `/eduservice/commentfront/save`,
      method: 'post',
      data: comment
    })
  }
} 