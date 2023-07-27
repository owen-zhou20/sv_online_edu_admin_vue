<template>
  <div>
    <!-- Banner start -->
    <!--<div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">

        <div v-for="banner in bannerList"
             :key="banner.id"
             class="swiper-slide"
             style="background: #040B1B;">
          <a target="_blank"
             :href="banner.linkUrl">
            <img :src="banner.imageUrl"
                 :alt="banner.title">
          </a>
        </div>

      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white"
           slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white"
           slot="button-next"></div>
    </div>-->
    <div class="block">
      <el-carousel height="650px">
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.imageUrl" style="width: 100%;height: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- Banner end -->

    <div id="aCoursesList">
      <!-- Hot course start -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">Hot Course</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of"
                  id="bna">
                <li v-for="course in courseList"
                    :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img :src="course.cover"
                           class="img-responsive"
                           :alt="course.title">
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id"
                           title="Start to learn"
                           class="comm-btn c-btn-1">Start to learn</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id"
                         :title="course.title"
                         class="course-title fsize18 c-333">{{course.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">{{ course.price==0? "Free" : "$"+ course.price}}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}} Sold</i>
                        |
                        <i class="c-999 f-fA">{{course.viewCount}} Viewed</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <router-link to="/course"
                         tag="li"
                         active-class="current">
              <a href="#"
                 title="All Courses"
                 class="comm-btn c-btn-2">All Courses
              </a>
              </router-link>
            </section>
          </div>
        </section>
      </div>
      <!-- Hot course end -->
      <!-- Hot teacher start -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">Hot Teacher</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList"
                    :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id"
                         :title="teacher.name">
                        <img :alt="teacher.name"
                             :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id"
                         :title="teacher.name"
                         class="fsize18 c666">{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.career}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{teacher.intro}}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <router-link to="/teacher"
                         tag="li"
                         active-class="current">
              <a href="#"
                 title="All Teachers"
                 class="comm-btn c-btn-2"
                 >All Teachers
              </a>
            </router-link>
            </section>
          </div>
        </section>
      </div>
      <!-- Hot teacher end -->
    </div>
  </div>
</template>

<script>
import banner from '@/api/banner'
import index from '@/api/index'

export default {
  data() {
    return {
     /* swiperOption: {
        //pagination
        pagination: {
          el: '.swiper-pagination'//pagination dom
        },
        //nav
        navigation: {
          nextEl: '.swiper-button-next',//next dom
          prevEl: '.swiper-button-prev'//prev dom
        }
      },*/ 
      bannerList: [], // banner list
      courseList: [],  // course list
      teacherList: []  //teacher list
    }
  },
  created() {
    // Get top 2 banners
    this.getBannerList()
    // Get hottest courses and teachers
    this.getHotCourseTeacher()
  },
  methods: {
    // Get hottest courses and teachers
    getHotCourseTeacher() {
      index.getIndexData()
        .then(response => {
          this.courseList = response.data.data.courseList
          this.teacherList = response.data.data.teacherList
        })
    },
    // Get top 2 banners
    getBannerList() {
      banner.getListBanner()
        .then(response => {
          this.bannerList = response.data.data.bannerList
        })
    }

  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>