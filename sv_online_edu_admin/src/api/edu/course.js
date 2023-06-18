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
  // 2. Get course info by course id
  getCourseInfoById(courseId) {
    return request({
      url: `/eduservice/course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  // 3. Modify course info by course id
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'put',
      data: courseInfo
    })
  },
  // 4. Get publish course info by course id
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/` + id,
      method: 'get'
    })
  },
  // 5. Publish course
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/` + id,
      method: 'put'
    })
  },
  // 6. Modify course status as draft
  draftCourse(id) {
    return request({
      url: `/eduservice/course/draftCourse/` + id,
      method: 'put'
    })
  },
  // 7. Course list
  getCourseList() {
    return request({
      url: `/eduservice/course/courseList`,
      method: 'get'
    })
  },
  // 8. Delete course by course id
  deleteCourseById(id) {
    return request({
      url: `/eduservice/course/` + id,
      method: 'delete'
    })
  },
  // 9. Conditions select course list with pagination
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageCourse/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  }
}
