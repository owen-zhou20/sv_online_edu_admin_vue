import request from '@/utils/request'
export default {
  // Get top 2 banners info 
  getListBanner() {
    return request({
      url: `/educms/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}