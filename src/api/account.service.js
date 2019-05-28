import request from '@/plugin/axios'

const LOGIN_URI = '/auth/login'

export const accountService = {
  // 用户登录
  login (data) {
    return request({
      url: LOGIN_URI,
      method: 'post',
      data
    })
  }
}
