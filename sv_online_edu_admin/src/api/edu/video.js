import request from '@/utils/request'

export default {
  // Add video by chapter id
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data: video
    })
  },
  // Modify video info by id
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data: video
    })
  },
  // Delete video info by video id
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/` + videoId,
      method: 'delete'
    })
  },
  // Get video info by id
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/` + videoId,
      method: 'get'
    })
  }
}
