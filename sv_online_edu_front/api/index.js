import request from '@/utils/request'

export default {
  // Get hottest courses and teachers
  getIndexData() {
    return request({
      url: `/eduservice/indexfront/index`,
      method: 'get'
    })
  }
}