/**
 * 获取权限
 * @param {*} key
 */
export function hasPermission (key) {
  return window.SITE_CONFIG['permissions'].indexOf(key) !== -1 || false
}

/**
 * 获取权限
 * @param {*} key
 */
export function hasAnyPermission (...keys) {
  for (var i = 0; i < keys.length; i++) {
    if (window.SITE_CONFIG['permissions'].indexOf(keys[i]) !== -1) {
      return true
    }
  }
  return false
}
