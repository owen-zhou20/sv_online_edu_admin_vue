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

export default service