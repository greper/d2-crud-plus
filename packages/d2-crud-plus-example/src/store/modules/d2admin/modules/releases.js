import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('d2-crud-plus', `v${process.env.VUE_APP_VERSION}`)
      // console.log('演示地址  http://qiniu.veryreader.com/D2CrudPlusExample/')
      // console.log('Git   https://github.com/greper/d2-crud-plus')
      // console.log('文档  http://greper.gitee.io/d2-crud-plus/')
      // console.log('请不要吝啬您的 star，谢谢 ~')
    }
  }
}
