import request from '@/utils/request'

export default {
  // Get all course chapters list include all videos list by course id
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/getChapterVideo/` + courseId,
      method: 'get'
    })
  }
}
