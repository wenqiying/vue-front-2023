import request from '@/utils/request'

export default {
  getCommentList(page,limit,courseId) {
    return request({
      url: `/eduservice/comment/getCommentPageList/${page}/${limit}/${courseId}`,
      method: 'get'
    })
  },
  addComment(commentInfo){
    return request({
      url: `/eduservice/comment/addComment`,
      method: 'post',
      data: commentInfo
    })
  },
}