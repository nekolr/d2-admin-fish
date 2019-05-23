import request from '@/plugin/axios'

const GET_USERINFO_URI_PREFIX = '/api/users/'

// 获取用户信息
export const userService = {
  getUserInfo (fuffix) {
    return request({
      url: GET_USERINFO_URI_PREFIX + fuffix,
      method: 'get'
    })
  }
}
