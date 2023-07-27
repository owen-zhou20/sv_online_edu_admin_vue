import request from '@/utils/request'

export default {
  // 1. conditions select banner list with pagination
  getBannerListPage(page, limit, bannerQuery) {
    return request({
      url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
      method: 'post',
      data: bannerQuery
    })
  },
  // 2. logic delete banner by id
  deleteBannerId(id) {
    return request({
      url: `/educms/banneradmin/remove/${id}`,
      method: 'delete'
    })
  },
  // add banner
  addBanner(banner) {
    return request({
      url: `/educms/banneradmin/addBanner`,
      method: 'post',
      data: banner
    })
  },
  // select banner by banner id for edit banner
  getBannerInfo(id) {
    return request({
      url: `/educms/banneradmin/get/${id}`,
      method: 'get'
    })
  },
  // edit banner
  updateBannerInfo(banner) {
    return request({
      url: `/educms/banneradmin/update`,
      method: 'put',
      data: banner
    })
  }
}
