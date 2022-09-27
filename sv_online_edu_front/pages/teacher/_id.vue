<template>
  <div id="aCoursesList"
       class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">Teacher information</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- Teacher info -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacher.avatar">
            </section>
            <h3 class="hLh30">
              <span class="fsize24 c-333">{{teacher.name}}&nbsp;
                {{teacher.level===1?'First level teacher':'Top level teacher'}}</span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{teacher.intro}}</span>
            </section>
            <section class="t-infor-txt">
              <p class="mt20">{{teacher.career}}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-coursecontent">
            <h2 class="fl tac">
              <span class="c-333">Courses for this teacher</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap"
                   v-if="courseList.length==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No data, still working on it...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of">
              <li v-for="course in courseList"
                  :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover"
                         class="img-responsive">
                    <div class="cc-mask">
                      <a href="#"
                         title="Start to learn"
                         target="_blank"
                         class="comm-btn c-btn-1">Start to learn</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a href="#"
                       :title="course.title"
                       target="_blank"
                       class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
export default {
  // asynchronous call, only call once
  // params.id = this.$route.params.id
  asyncData({ params, error }) {
    return teacherApi.getTeacherInfo(params.id)
      .then(response => {
        return {
          teacher: response.data.data.teacher,
          courseList: response.data.data.courseList
        }
      })
  }


};
</script>
