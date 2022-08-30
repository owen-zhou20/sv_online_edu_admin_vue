import request from '@/utils/request'

export default {
  // 1. Add course info
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 2. Get teacher list
  getListTeacher() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },
  // 3. Get course info by course id
  getCourseInfoById(courseId) {
    return request({
      url: `/eduservice/course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  // 4. Modify course info by course id
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 5. Get publish course info by course id
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/` + id,
      method: 'get'
    })
  },
  // 6. Publish course
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/` + id,
      method: 'post'
    })
  },
  // 7. Modify course status as draft
  draftCourse(id) {
    return request({
      url: `/eduservice/course/draftCourse/` + id,
      method: 'post'
    })
  },
  // 8. Course list
  getCourseList() {
    return request({
      url: `/eduservice/course/courseList`,
      method: 'get'
    })
  },
  // 9. Delete course by course id
  deleteCourseById(id) {
    return request({
      url: `/eduservice/course/` + id,
      method: 'delete'
    })
  },
  // 10. Conditions select course list with pagination
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageCourse/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  }
}
