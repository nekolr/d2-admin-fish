import request from '@/plugin/axios'

const GET_CURRENT_USER_MENU_LIST_URI = '/api/currentUserMenus'

export const menuService = {
  // 获取当前用户菜单列表
  getCurrentUserMenuList () {
    return request({
      url: GET_CURRENT_USER_MENU_LIST_URI,
      method: 'get'
    })
  },
  // 获取 icon 列表
  getIconList () {
    var res = []
    var list = document.querySelectorAll('svg symbol')
    for (var i = 0; i < list.length; i++) {
      res.push(list[i].id)
    }
    return res
  }
}
