import request from '@/utils/request'

export default {
  createOrders(courseId) {
    return request({
      url: `/eduorder/order/createOrders/${courseId}`,
      method: 'post'
    })
  },
  getOrdersInfo(orderId){
    return request({
      url: `/eduorder/order/getOrderInfo/${orderId}`,
      method: 'get'
    })
  },
  createNative(orderId){
    return request({
      url: `/eduorder/paylog/createNative/${orderId}`,
      method: 'get'
    })
  },
  queryPayStatus(orderId){
    return request({
      url: `/eduorder/paylog/queryPayStatus/${orderId}`,
      method: 'get'
    })
  }
}