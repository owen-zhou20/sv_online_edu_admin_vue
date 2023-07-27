<template>
  <div class="main">
    <div class="title">
      <a class="active"
         href="/login">Login</a>
      <span>·</span>
      <a href="/register">Register Now</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm"
               :model="user">
        <el-form-item class="input-prepend restyle"
                      prop="mobile"
                      :rules="[{ required: true, message: 'Please enter your phone number!', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text"
                      placeholder="Phone Number"
                      v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend"
                      prop="password"
                      :rules="[{ required: true, message: 'Please enter your password!', trigger: 'blur' }]">
          <div>
            <el-input type="password"
                      placeholder="Password"
                      v-model="user.password" />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button"
                 class="sign-in-button"
                 value="Login"
                 @click="submitLogin()">
        </div>
      </el-form>
      <!-- other way to login -->
      <div class="more-sign">
        <h6>Other account to login</h6>
        <ul>
          <li>
            <a id="weixin"
               class="weixin"
               target="_blank"
               href="http://localhost:8160/api/ucenter/wx/login"><i class="iconfont icon-weixin" />
            </a>
          </li>
          <li><a id="qq"
               class="qq"
               target="_blank"
               href="#"><i class="iconfont icon-qq" /></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
  layout: 'sign',
  data() {
    return {
      // For login info
      user: {
        mobile: '',
        password: ''
      },
      // To get user info form api
      loginInfo: {}
    }
  },
  methods: {
    // login
    submitLogin() {
      // Get token from api 
      loginApi.submitLoginUser(this.user)
        .then(response => {
          // put token into cookie
          cookie.set('sv_token', response.data.data.token, { domain: 'localhost' })

          // Get user info for home page from api
          loginApi.getLoginUserInfo()
            .then(response => {
              // Get user info and put into cookie
              this.loginInfo = response.data.data.userInfo
              //console.log('this.loginInfo ==='+this.loginInfo)
              //console.log('JSON.stringify(this.loginInfo) ==='+JSON.stringify(this.loginInfo))
              cookie.set('sv_ucenter', JSON.stringify(this.loginInfo), { domain: 'localhost' })
              //cookie.set('sv_ucenter', this.loginInfo, { domain: 'localhost' })
              // go to home page
              window.location.href = "/";
            })

        })
    },
    checkPhone(rule, value, callback) {
      //debugger
      if (!(/^0\d{9}$/.test(value))) {
        return callback(new Error('Please type a Australian phone number start with "0"!'))
      }
      return callback()
    }
  }
}
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>