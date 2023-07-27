<template>
  <div class="in-wrap">

    <!-- Common header -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#"
             title="SV EDU">
            <img src="~/assets/img/logo.png"
                 width="100%"
                 alt="SV EDU">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/"
                         tag="li"
                         active-class="current"
                         exact>
              <a>Homepage</a>
            </router-link>
            <router-link to="/course"
                         tag="li"
                         active-class="current">
              <a>Courses</a>
            </router-link>
            <router-link to="/teacher"
                         tag="li"
                         active-class="current">
              <a>Teachers</a>
            </router-link>
            <router-link to="/article"
                         tag="li"
                         active-class="current">
              <a>Articles</a>
            </router-link>
            <router-link to="/support"
                         tag="li"
                         active-class="current">
              <a>Support</a>
            </router-link>
          </ul>
          <!--  /nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id"
                id="no-login">
              <a href="/login"
                 title="Login">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">Login</span>
              </a>
              |
              <a href="/register"
                 title="Register">
                <span class="vam ml5">Register</span>
              </a>
            </li>
            <li v-if="loginInfo.id"
                id="is-login-one"
                class="mr10">
              <a id="headerMsgCountId"
                 href="#"
                 title="Message">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point"
                 style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id"
                id="is-login-two"
                class="h-r-user">
              <a href="/ucenter"
                 title>
                <img :src="loginInfo.avatar"
                     width="30"
                     height="30"
                     class="vam picImg"
                     alt>
                <span id="userName"
                      class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);"
                 title="Logout"
                 @click="logout()"
                 class="ml5">Logout</a>
            </li>
            <!-- /show first li if not login；show 2，3 li if login -->
          </ul>
          <aside class="h-r-search">
            <form action="#"
                  method="post">
              <label class="h-r-s-box">
                <input type="text"
                       placeholder="Search course"
                       name="queryCourse.courseName"
                       value>
                <button type="submit"
                        class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /Common header -->

    <nuxt />

    <!-- Common footer -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">Sv Website</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.sv.com/"
                 title="Sv shopping portal"
                 target="_blank">Sv Shopping Portal</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#"
                   title="About Sv Edu"
                   target="_blank">About Sv Edu</a>|
                <a href="#"
                   title="Contact us"
                   target="_blank">Contact us</a>|
                <a href="#"
                   title="Help and Support"
                   target="_blank">Help and Support</a>|
                <a href="#"
                   title="Privacy policy"
                   target="_blank">Privacy policy</a>|
                <span>Careers</span>
                <span>Email:owen.zhou20@gmail.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>Copyright © 2004 - 2023 Pluralsight LLC. All rights reserved</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png"
                     alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png"
                     alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /Common footer -->

  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import '~/assets/css/reset.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },
  created() {
    // Get token from pass
    this.token = this.$route.query.token
    if (this.token) {
      this.wcLogin()
    }
    this.showInfo()
  },
  methods: {
    // Wechat login
    wcLogin() {
      if (this.token == '') return
      cookie.set('sv_token', this.token, { domain: 'localhost' })
      cookie.set('sv_ucenter', '', { domain: 'localhost' })
      loginApi.getLoginUserInfo()
        .then(response => {
          this.loginInfo = response.data.data.userInfo
          cookie.set('sv_ucenter', JSON.stringify(this.loginInfo), { domain: 'localhost' })
        })

    },
    // Get user info from cookie
    showInfo() {
      // Get user info from cookie
      var userStr = cookie.get('sv_ucenter')
      // json String => json entity
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },
    logout() {
      // empty cookie
      //cookie.set('sv_token', '', { domain: 'localhost' })
      //cookie.set('sv_ucenter', '', { domain: 'localhost' })
      cookie.remove('sv_token', { domain: 'localhost' })
      cookie.remove('sv_ucenter', { domain: 'localhost' });
      // go to home page
      window.location.href = "/";
    }
  }
};
</script>