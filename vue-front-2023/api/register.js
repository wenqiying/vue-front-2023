import request from '@/utils/request'

export default {
  sendCode(phoneNum) {
    return request({
      url: `/edumsm/msm/send/${phoneNum}`,
      method: 'get'
    })
  },
  registerMember(member){
    return request({
      url: `/educenter/member/userRegister`,
      method: 'post',
      data: member
    })
  }
}