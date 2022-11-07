import request from '@/utils/request'

export default {
  // Create order
  createOrders(courseId) {
    return request({
      url: `/eduorder/order/createOrder/${courseId}`,
      method: 'post'
    })
  },
  // Get order info by order id
  getOrdersInfo(orderNo) {
    return request({
      url: `/eduorder/order/getOrderInfo/${orderNo}`,
      method: 'get'
    })
  },
  //create QR code 
  createQrcode(orderNo) {
    return request({
      url: `/eduorder/paylog/createQrcode/${orderNo}`,
      method: 'get'
    })
  },
  // Get order status
  queryPayStatus(orderNo) {
    return request({
      url: `/eduorder/paylog/queryPayStatus/${orderNo}`,
      method: 'get'
    })
  }
} 