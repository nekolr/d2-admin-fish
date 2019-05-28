import Cookies from 'js-cookie'

const cookies = {}
// cookies 过期时间为半小时
const expiresHours = 0.5

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: new Date(new Date().getTime() + expiresHours * 60 * 60 * 1000)
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`d2admin-fish-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`d2admin-fish-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`d2admin-fish-${process.env.VUE_APP_VERSION}-${name}`)
}

export default cookies
