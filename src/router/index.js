import Vue from 'vue'
import VueRouter from 'vue-router'
import { menuService } from '@/api/menu.service'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
import util from '@/libs/util.js'
import { isURL } from '@/libs/validate'

// 路由数据
import { pageRoutes, moduleRoutes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: pageRoutes.concat(moduleRoutes)
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)

  // 已添加或者当前路由为页面路由, 可直接访问
  if (window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] || currentRouteIsPageRoute(to, pageRoutes)) {
    return next()
  }
  // 动态添加（菜单）路由
  menuService
    .getCurrentUserMenuList()
    .then(res => {
      window.SITE_CONFIG['menuList'] = res
      dynamicAddMenuRoutes(res)
      // 性能优化，提前计算出路由 id 和 route 属性的对照
      const routeNameDict = menuToRouteDict(res, 'name')
      const routePathDict = menuToRouteDict(res, 'path')
      store.commit('d2admin/menu/asideSet', menuToD2AdminMenu(res, routeNameDict))
      store.commit('d2admin/page/init', menuToD2AdminPageInitData(res, routeNameDict, routePathDict))
      store.commit('d2admin/search/init', menuToD2AdminSearchInitData(res, routeNameDict, routePathDict))
      next({ ...to, replace: true })
      // 进度条
      NProgress.done()
    }).catch(error => {
      console.log('error', error)
      next({ name: 'login' })
      // 进度条
      NProgress.done()
    })
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function currentRouteIsPageRoute (route, pageRoutes = []) {
  var temp = []
  for (var i = 0; i < pageRoutes.length; i++) {
    if (route.path === pageRoutes[i].path) {
      return true
    }
    if (pageRoutes[i].children && pageRoutes[i].children.length >= 1) {
      temp = temp.concat(pageRoutes[i].children)
    }
  }
  return temp.length >= 1 ? currentRouteIsPageRoute(route, temp) : false
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function dynamicAddMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
      continue
    }
    // 组装路由
    let route = {
      path: '',
      component: null,
      name: '',
      meta: {
        ...window.SITE_CONFIG['contentTabDefault'],
        menuId: menuList[i].id,
        title: menuList[i].name
      }
    }
    // TODO: 因为下面的 eval(s2) 导致暂时只能使用 window.SITE_CONFIG 全局变量。s2 的值中存在这段代码
    // eslint-disable-next-line
    let URL = (menuList[i].path || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL 支持 {{ window.xxx }} 占位符变量
    if (isURL(URL)) {
      route['path'] = route['name'] = `i-${menuList[i].id}`
      route['meta']['iframeURL'] = URL
      route['component'] = {
        render (h) {
          return h('d2-container', {}, [
            h('iframe', {
              style: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                height: '100%',
                width: '100%'
              },
              attrs: {
                src: URL,
                frameborder: 0
              }
            })
          ])
        }
      }
    } else {
      route['path'] = route['name'] = URL
      route['component'] = () => import(`@/views/modules/${URL}`)
    }
    routes.push(route)
  }
  if (temp.length >= 1) {
    return dynamicAddMenuRoutes(temp, routes)
  }
  // 添加路由
  router.addRoutes([
    {
      ...(moduleRoutes[0]),
      name: 'main-dynamic-menu',
      children: routes
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ])
  window.SITE_CONFIG['dynamicMenuRoutes'] = routes
  window.SITE_CONFIG['dynamicMenuRoutesHasAdded'] = true
}

/**
 * 将后台传来的菜单数据整理成 [{ id: routeName }] 的键值对数组
 * @param {Array} menuArray 后台返回的菜单格式
 */
function menuToRouteDict (menuArray, routePropName = 'name') {
  const dict = {}
  const step = menu => {
    var route = window.SITE_CONFIG['dynamicMenuRoutes'].filter(item => item.meta.menuId === menu.id)[0]
    if (route) {
      Object.defineProperty(dict, menu.id, {
        value: route[routePropName]
      })
    }
    if (menu.children.length > 0) {
      menu.children.forEach(step)
    }
  }
  menuArray.forEach(step)
  return dict
}

/**
 * 删除无用的 children 字段以及精简数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict menuToRouteDict 生成的菜单名称和 id 的对照表
 */
function menuToD2AdminMenu (menuArray, routeNameDict) {
  const transform = menu => ({
    ...menu.children.length > 0 ? { children: menu.children.map(e => transform(e)) } : {},
    id: menu.id,
    icon: menu.icon,
    title: menu.name,
    name: routeNameDict[menu.id]
  })
  return menuArray.map(e => transform(e))
}

/**
 * 将后台返回的数据转化成 d2admin/page/init 使用的数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict menuToRouteDict 生成的菜单名称和 id 的对照表
 * @param {Array} routePathDict menuToRouteDict 生成的菜单名称和 path 的对照表
 */
function menuToD2AdminPageInitData (menuArray, routeNameDict, routePathDict) {
  const transform = menu => ({
    ...menu.children.length > 0 ? { children: menu.children.map(e => transform(e)) } : {},
    meta: {
      title: menu.name
    },
    name: routeNameDict[menu.id],
    path: routePathDict[menu.id]
  })
  return menuArray.map(e => transform(e))
}

/**
 * 将后台返回的数据转化成 d2admin/page/init 使用的数据
 * @param {Array} menuArray 后台返回的菜单格式
 * @param {Array} routeNameDict menuToRouteDict 生成的菜单名称和 id 的对照表
 * @param {Array} routePathDict menuToRouteDict 生成的菜单名称和 path 的对照表
 */
function menuToD2AdminSearchInitData (menuArray, routeNameDict, routePathDict) {
  const transform = menu => ({
    ...menu.children.length > 0 ? { children: menu.children.map(e => transform(e)) } : {},
    path: routePathDict[menu.id],
    title: menu.name,
    icon: menu.icon
  })
  return menuArray.map(e => transform(e))
}

export default router
