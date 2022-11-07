import request from '@/utils/request'

export default {
  // 1. Create statistic daily data
  createStaData(day) {
    return request({
      url: `/statistics/StaDaily/registerCount/` + day,
      method: 'post'
    })
  },
  // 2. Get statistic daily data to show
  getDataSta(searchObj) {
    return request({
      url: `/statistics/StaDaily/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }

}
