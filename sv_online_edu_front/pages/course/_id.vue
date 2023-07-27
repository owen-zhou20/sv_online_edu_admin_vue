<template>
  <div id="aCoursesList"
       class="bg-fa of">
    <!-- Course start -->
    <section class="container">
      <!-- Subject start-->
      <section class="path-wrap txtOf hLh30">
        <a href="#"
           title
           class="c-999 fsize14">Home</a>
        \
        <a href="/course" title class="c-999 fsize14">All courses</a>
        \
        <span  class="c-333 fsize14">{{courseWebVo.subjectLevelOne}}</span>
        \
        <span class="c-333 fsize14">{{courseWebVo.subjectLevelTwo}}</span>
      </section>
      <!-- Subject end-->
      <!-- Course base info start-->
      <div>
        <article class="c-v-pic-wrap"
                 style="height: 357px;">
          <section class="p-h-video-box"
                   id="videoPlay">
            <img height="357px"
                 :src="courseWebVo.cover"
                 alt="courseWebVo.title"
                 class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{courseWebVo.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">Price: </span>
              <b class="c-yellow"
                 style="font-size:24px;">${{courseWebVo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">Teacher: {{courseWebVo.teacherName}}&nbsp;&nbsp;&nbsp;
              </span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam"
                   title="Favorite"
                   href="#">Favorite</a>
              </span>
            </section>
            <section v-if="isBuy || Number(courseWebVo.price)===0"
                     class="c-attr-mt">
              <a href="#"
                 title="Watching"
                 class="comm-btn c-btn-3">Watching</a>
            </section>
            <section v-else
                     class="c-attr-mt">
              <a @click.prevent="createOrders()"
                 href="#"
                 title="Buy this course"
                 class="comm-btn c-btn-3">Buy this course</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Sold</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">Lessons</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">View Count</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseWebVo.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- Course base info end-->
      <!-- Course description info start -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle"
                         class="c-infor-tabTitle ctab-title">
                  <a name="c-i"
                     class="current"
                     title="Course Info">Course Info</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>Course description</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseWebVo.description">{{courseWebVo.description}}</p>
                    </section>
                  </div>
                </div>
                <!-- /Course description info end -->
                <!-- Chapter start -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>Chapters</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu"
                            class="lh-menu mt10 mr10">
                        <ul>
                          <li class="lh-menu-stair"
                              v-for="chapter in chapterVideoList"
                              :key="chapter.id">
                            <a href="javascript: void(0)"
                               :title="chapter.title"
                               class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}</a>

                            <ol class="lh-menu-ol"
                                style="display:block;">
                              <li class="lh-menu-second ml30"
                                  v-for="video in chapter.children"
                                  :key="video.id">
                                <a v-if="isBuy || Number(courseWebVo.price)===0" 
                                  :href="'/player/'+video.videoSourceId"
                                  :title="video.title"
                                  target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">Play</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                                <a v-if="!(isBuy || Number(courseWebVo.price)===0)" 
                                  @click.prevent="createOrders()" 
                                  href="#" 
                                  :title="video.title"
                                  target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">Buy this course</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /Chapter end -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- Course teacher start -->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title
                   href="javascript:void(0)">Teacher for this course</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+courseWebVo.teacherId">
                        <img :src="courseWebVo.avatar"
                             width="50"
                             height="50"
                             alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl"
                         :href="'/teacher/'+courseWebVo.teacherId">{{courseWebVo.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseWebVo.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /Course teacher end -->
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /Course end -->
    <!-- Comment start-->
    <div class="mt50 commentHtml"><div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">Course comment</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea name="commentContent" v-model="comment.content" placeholder="Enter your comment" id="commentContent"></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl "><text class="c-red commentContentmeg" style="display: none;"></text></span>
                    <input type="button" @click="addComment()" value="Comment" class="btn btn-default btn-lg">
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment,index) in data.items" v-bind:key="index">
                    <aside class="noter-pic">
                      <img width="50" height="50" class="picImg" :src="comment.avatar">
                      </aside>
                    <div class="of">
                      <span class="fl"> 
                      <front class="fsize12 c-blue"> 
                        {{comment.nickname}}</front>
                      <front class="fsize12 c-999 ml5">Comment:</front></span>
                    </div>
                    <div class="noter-txt mt5">
                      <p>{{comment.content}}</p>
                    </div>
                    <div class="of mt5">
                      <span class="fr"><front class="fsize12 c-999 ml5">{{comment.gmtCreate}}</front></span>
                    </div>
                  </li>
                
                </ul>
            </section>
          </section>
          
          <!-- Comment pagination start -->
          <div class="paging">
              <!-- has undisable base on hasPrevious -->
              <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="FirstPage"
              @click.prevent="gotoPage(1)">First</a>
              <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="previous"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
              <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'Go to'+page"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
              <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="next"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
              <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="LastPage"
              @click.prevent="gotoPage(data.pages)">Last</a>
              <div class="clear"/>
          </div>
          <!-- Comment pagination end -->
        </div>
      </div>
      <!-- Comment end-->
  </div>
</template>
<script>
import courseApi from '@/api/course'
import ordersApi from '@/api/orders'
import commentApi from '@/api/comment'
import cookie from 'js-cookie'

export default {
  asyncData({ params, error }) {
     return {courseId: params.id}
   },
  data() {
    return {
      data:{},
      page:1,
      limit:4,
      total:10,
      courseId:'',
      comment:{
        content:'',
        courseId:''
      },
      courseWebVo: {},
      chapterVideoList: [],
      isBuy: false
      //courseId: this.$router.params.id
    }
  },
  created() {
    this.initCourseInfo()
    this.initComment()
  },
  methods: {
    // Get course info 
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId)
        .then(response => {
          this.courseWebVo = response.data.data.courseWebVo,
          this.chapterVideoList = response.data.data.chapterVideoList,
          this.isBuy = response.data.data.isBuy
        })
    },
    // Get comment for this course id
    initComment(){
      commentApi.getPageList(this.page,this.limit,this.courseId)
        .then(response => {
          this.data = response.data.data
        })
    },
    // Add a comment for this course by member Id
    addComment(){
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.courseWebVo.teacherId
      commentApi.addComment(this.comment)
        .then(response =>{
          if(response.data.success){
            this.comment.content = ''
            this.initComment()
          }
        })

    },
    // Go to page for comments
    gotoPage(page){
      this.page = page
      commentApi.getPageList(this.page,this.limit,this.courseId)
        .then(response =>{
          this.data = response.data.data
        })
    },
    // Create orders
    createOrders() {
      if(!(cookie.get('sv_ucenter'))){
        this.$router.push({ path: '/login/'})
      }else{
        ordersApi.createOrders(this.courseId)
          .then(response => {
          // Go to order info 
          this.$router.push({ path: '/orders/' + response.data.data.orderNo })
        })
      }
    }
  }

};
</script>
