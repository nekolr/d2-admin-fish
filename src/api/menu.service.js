import request from '@/plugin/axios'

const GET_CURRENT_USER_MENU_LIST_URI = '/api/menu'

export const menuService = {
  // 获取菜单列表
  getCurrentUserMenuList () {
    return request({
      url: GET_CURRENT_USER_MENU_LIST_URI,
      method: 'get'
    })
  }
}
