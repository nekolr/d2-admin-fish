import request from '@/plugin/axios'

const GET_USERINFO_URI_PREFIX = '/api/users/'
const GET_CURRENT_USERINFO_URI = '/api/user'

export const userService = {
  // 获取用户信息
  getUserInfo (fuffix) {
    return request({
      url: GET_USERINFO_URI_PREFIX + fuffix,
      method: 'get'
    })
  },
  // 获取当前用户信息
  getCurrentUserInfo () {
    return request({
      url: GET_CURRENT_USERINFO_URI,
      method: 'get'
    })
  }
}
