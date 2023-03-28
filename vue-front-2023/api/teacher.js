import request from '@/utils/request'

export default {
  getTeacherList(page,limit) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFront/${page}/${limit}`,
      method: 'get'
    })
  },
  getTeacherInfo(teacherId){
    return request({
      url: `/eduservice/teacherfront/getTeacherInfo/${teacherId}`,
      method: 'get'
    })
  },
}