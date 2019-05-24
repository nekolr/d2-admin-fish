import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/libs/util'
import { isPlainObject } from 'lodash'
import qs from 'qs'
import store from '@/store'

const TOKEN_PREFIX = 'Bearer '
const LOGIN_URI = '/auth/login'

// 记录和显示错误
function errorLog (error) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 注销操作
function logout () {
  store.dispatch('d2admin/account/logout')
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 60 * 1000,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // TODO: 这里能否将一些常量集中定义
    // 如果是登录请求，则不需要加上 Token
    if (config.url.substring(config.baseURL) !== LOGIN_URI) {
      // 在请求发送之前做一些处理
      const token = util.cookies.get('token')
      // 让每个请求携带 token-- ['Authorization'] 为自定义 key 请根据实际情况自行修改
      config.headers['Authorization'] = TOKEN_PREFIX + token
    }
    let defaults = {}
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ '_t': new Date().getTime() }
      }
    }
    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params
      }
    }
    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data
      }
      if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      logout()
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; logout(); break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    } else {
      error.message = '网络异常'
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
