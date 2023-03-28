import request from '@/utils/request'

export default {
  getUserLoginInfo() {
    return request({
      url: `/educenter/member/getLoginInfo`,
      method: 'get'
    })
  },
  userLogin(userInfo){
    return request({
      url: `/educenter/member/userLogin`,
      method: 'post',
      data: userInfo
    })
  }
}