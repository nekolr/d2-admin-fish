import request from '@/plugin/axios'

const LOGIN_URI = '/auth/login'

// 用户登录
export const accountService = {
  login (data) {
    return request({
      url: LOGIN_URI,
      method: 'post',
      data
    })
  }
}
