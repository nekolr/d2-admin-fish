export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  mutations: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set (state, info) {
      // store 赋值
      state.info = info
    }
  }
}
