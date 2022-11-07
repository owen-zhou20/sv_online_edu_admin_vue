import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9002', // api的base_url
  timeout: 20000 // 请求超时时间
})

// create http interceptor
service.interceptors.request.use(
  config => {
    //debugger
    if (cookie.get('sv_token')) {
      config.headers['token'] = cookie.get('sv_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })

//
// create http interceptor
service.interceptors.response.use(
  response => {
    //debugger
    if (response.data.code == 28004) {
      console.log("response.data.resultCode is 28004")
      // return error code -1 and clear ticket info and go to login in page
      //debugger
      window.location.href = "/login"
      return
    } else {
      if (response.data.code != 20000) {
        //25000: waiting payment to finish, do nothing
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
    }
    return config
  },
  error => {
    return Promise.reject(error.response); // return error message fron API error
  });

export default service