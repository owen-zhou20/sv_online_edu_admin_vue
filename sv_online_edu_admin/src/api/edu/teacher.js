import request from '@/utils/request'

export default {
  // 1. conditions select teacher list with pagination
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 2. logic delete teacher by id
  deleteTeacherId(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // add teacher
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // select teacher by teacher id for edit teacher
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  // edit teacher
  updateTeacherInfo(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'put',
      data: teacher
    })
  }
}
