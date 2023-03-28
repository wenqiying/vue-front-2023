import request from '@/utils/request'

export default {
  getCourseList(page,limit,searchObj) {
    return request({
      url: `/eduservice/coursefront/getCoursePageListByCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  getSubjectList(){
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },
  getBaseCourseInfo(courseId){
    return request({
      url: `/eduservice/coursefront/getCourseBaseInfo/${courseId}`,
      method: 'get'
    })
  }
}