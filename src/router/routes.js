
// 模块路由（基于主入口布局页面）
export const moduleRoutes = [{
  path: '/',
  component: () => import('@/layout/header-aside'),
  redirect: { name: 'index' },
  meta: { title: '主入口布局' },
  children: [
    {
      path: '/index',
      component: () => import('@/views/modules/index'),
      name: 'index',
      meta: {
        title: '首页',
        isTab: true
      }
    }
  ]
}]

// 页面路由（独立页面）
export const pageRoutes = [
  {
    path: '/login',
    component: () => import('@/views/d2admin/login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/d2admin/error/404'),
    name: '404',
    meta: {
      title: '404 未找到'
    }
  }
]

// 导出
export default [
  ...moduleRoutes,
  ...pageRoutes
]
