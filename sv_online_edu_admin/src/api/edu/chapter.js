import request from '@/utils/request'

export default {
  // Get all course chapters list include all videos list by course id
  getAllChapterVideo(courseId) {
    return request({
      url: `/eduservice/chapter/getChapterVideo/` + courseId,
      method: 'get'
    })
  },
  // Get all course chapters list include all videos list by course id
  addChapter(chapter) {
    return request({
      url: `/eduservice/chapter/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  // Get chapter info by id
  getChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/getChapterInfo/` + chapterId,
      method: 'get'
    })
  },
  // Modify chapter info by id
  updateChapter(chapter) {
    return request({
      url: `/eduservice/chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  // Delete chapter info by id
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/chapter/` + chapterId,
      method: 'delete'
    })
  }
}
