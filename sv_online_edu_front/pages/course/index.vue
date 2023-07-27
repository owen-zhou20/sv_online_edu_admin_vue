<template>
  <div id="aCoursesList"
       class="bg-fa of">
    <!-- Course list start -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">All courses</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt style="width: 100px;">
              <span class="c-999 fsize13" >Course type</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="{active:oneIndex==-1}">
                  <a title="All"
                     href="#"
                     @click="searchAll()">All</a>
                </li>
                <!-- one subject -->
                <li v-for="(item,index) in subjectNestedList"
                    :key="index"
                    :class="{active:oneIndex==index}">
                  <a title="item.title"
                     href="#"
                     @click="searchOne(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- two subject -->
                <li v-for="(item,index) in subSubjectList"
                    :key="index"
                    :class="{active:twoIndex==index}">
                  <a title="item.title"
                     href="#"
                     @click="searchTwo(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buySortClear!=''}">
                <a title="Clear"
                   href="javascript:void(0);"
                   @click="searchClear()">Clear
                </a>
              </li>
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="Best Selling"
                   href="javascript:void(0);"
                   @click="searchBuyCount()">Best Selling
                  <span :class="{hide:buyCountSort!='1'}">↓</span>
                  <span :class="{hide:buyCountSort!='2'}">↑</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="New"
                   href="javascript:void(0);"
                   @click="searchGmtCreate()">New
                  <span :class="{hide:gmtCreateSort!='1'}">↓</span>
                  <span :class="{hide:gmtCreateSort!='2'}">↑</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="Price"
                   href="javascript:void(0);"
                   @click="searchPrice()">Price&nbsp;
                  <span :class="{hide:priceSort!='1'}">↓</span>
                  <span :class="{hide:priceSort!='2'}">↑</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- No data notice start-->
          <section class="no-data-wrap"
                   v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">No data, still working on it...</span>
          </section>
          <!-- /No data notice end-->
          <!-- course list start-->
          <article class="comm-course-list"
                   v-if="data.total>0">
            <ul class="of"
                id="bna">
              <li v-for="item in data.items"
                  :key="item.id" 
                  height="100%" width="100%">
                <div class="cc-l-wrap" >
                  <section class="course-img">
                    <img height="100%" width="100%" 
                         :src="item.cover"
                         class="img-responsive"
                         :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id"
                         title="Start to learn"
                         class="comm-btn c-btn-1">Start to learn</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id"
                       :title="item.title"
                       class="coursetitle fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{ item.price==0? "Free" : "$"+ item.price}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.buyCount}} Sold</i>
                      |
                      <i class="c-999 f-fA">{{item.viewCount}} Viewed</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- course list end-->
        <!-- Pagenation start -->
        <div>
          <div class="paging">
            <!-- undisable base on hasPrevious -->
            <a :class="{undisable: !data.hasPrevious}"
               href="#"
               title="FirstPage"
               @click.prevent="gotoPage(1)">First</a>
            <a :class="{undisable: !data.hasPrevious}"
               href="#"
               title="previous"
               @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a v-for="page in data.pages"
               :key="page"
               :class="{current: data.current == page, undisable: data.current == page}"
               :title="'第'+page+'页'"
               href="#"
               @click.prevent="gotoPage(page)">{{ page }}</a>
            <a :class="{undisable: !data.hasNext}"
               href="#"
               title="next"
               @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a :class="{undisable: !data.hasNext}"
               href="#"
               title="LastPage"
               @click.prevent="gotoPage(data.pages)">Last</a>
            <div class="clear" />
          </div>
        </div>
        <!-- Pagenation end -->
      </section>
    </section>
    <!-- /Course list end -->
  </div>
</template>
<script>
import courseApi from '@/api/course'

export default {
  data() {
    return {
      page: 1,
      data: {},
      subjectNestedList: [], // one level subject
      subSubjectList: [], // two level subject
      searchObj: {}, // select object Vo

      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: "",
      buySortClear: ""
    }
  },
  created() {
    this.initCourse();
    this.initSubject()
  },
  methods: {
    // 1. Get first page course data
    initCourse() {
      courseApi.getCourseList(1, 8, this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    // 2. Get all subject
    initSubject() {
      courseApi.getAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.list
        })
    },
    // 3. Change page to pagination select course list
    gotoPage(page) {
      this.page = page
      courseApi.getCourseList(page, 8, this.searchObj)
        .then(response => {
          this.data = response.data.data
        })
    },
    // Get two subjects and courses for one subject when is clicked
    searchOne(subjectParentId, index) {
      // active .class show selected
      this.oneIndex = index
      this.twoIndex = -1
      this.searchObj.subjectId = ""
      this.subSubjectList = []
      // Click one subject get result 
      this.searchObj.subjectParentId = subjectParentId
      this.gotoPage(1)
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        // Get every one subject
        var oneSubject = this.subjectNestedList[i]
        if (subjectParentId == oneSubject.id) {
          this.subSubjectList = oneSubject.children
        }

      }
    },
    // Get courses for two subject when is clicked
    searchTwo(subjectId, index) {
      // active .class show selected
      this.twoIndex = index
      // Click two subject get result 
      this.searchObj.subjectId = subjectId
      this.gotoPage(1)
    },
    // Get all 
    searchAll() {
      this.searchObj.subjectParentId = ""
      this.searchObj.subjectId = ""
      this.subSubjectList = []
      this.oneIndex = -1
      this.twoIndex = -1
      this.gotoPage(1)
    },
    //
    searchBuyCount() {
      // active .class show selected
      this.buySortClear = ""
      if (this.buyCountSort == "1") {
        this.buyCountSort = "2"
      } else {
        this.buyCountSort = "1"
      }
      this.gmtCreateSort = ""
      this.priceSort = ""
      // set order by condition then get courses
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(1)
    },
    //
    searchGmtCreate() {
      // active .class show selected
      this.buySortClear = ""
      this.buyCountSort = ""
      if (this.gmtCreateSort == "1") {
        this.gmtCreateSort = "2"
      } else {
        this.gmtCreateSort = "1"
      }
      this.priceSort = ""
      // set order by condition then get courses
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(1)
    },
    //
    searchPrice() {
      // active .class show selected
      this.buySortClear = ""
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      if (this.priceSort == "1") {
        this.priceSort = "2"
      } else {
        this.priceSort = "1"
      }

      // set order by condition then get courses
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(1)
    },
    // clear search conditions
    searchClear() {
      this.buySortClear = "1"
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      this.priceSort = ""
      // set order by condition then get courses
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(1)
    }
  }
};
</script>
<style>
.undisable {
  pointer-events: none;
}
.active {
  background: #68cb9b;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>