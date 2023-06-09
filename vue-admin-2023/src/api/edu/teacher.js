import request from '@/utils/request'

export default {
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    },
    deleteTeacherById(id) {
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete',
        })
    },
    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    getTeacherById(id) {
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    updateTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    },
}