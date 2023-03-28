import request from '@/utils/request'

export default{
    addCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getTeacherList() {
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get'
        })
    },
    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get'
        })
    },
    updateCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getCoursePublishInfo(courseId) {
        return request({
            url: `/eduservice/course/getCoursePublishInfo/${courseId}`,
            method: 'get'
        })
    },
    CoursePublish(courseId) {
        return request({
            url: `/eduservice/course/publishCourse/${courseId}`,
            method: 'put'
        })
    },
    getCourseList(current,limit,courseQuery){
        return request({
            url: `/eduservice/course/pageListCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },
    deleteCourse(courseId){
        return request({
            url: `/eduservice/course/deleteCourse/${courseId}`,
            method: 'delete'
        })
    }
}