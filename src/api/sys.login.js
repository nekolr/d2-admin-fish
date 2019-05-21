import request from '@/plugin/axios'

// 用户登录
export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
