import store from '@/store'
import { getPermissions } from './store/api'
import util from '@/libs/util'
import Vue from 'vue'
import permissionDirective from './directive/permission'
import storeModule from './store/permission.store'
import router from '@/router'

function isInited () {
  if (!isEnabled) {
    console.warn('PM is disabled')
    return true
  }
  return store.getters['permission/inited']
}

function registerRouterHook () {
  // 注册路由beforeEach钩子，在第一次加载路由页面时，加载权限
  router.beforeEach(async (to, from, next) => {
    if (!isEnabled || isInited()) {
      next()
      return
    }
    const token = util.cookies.get('token')
    if (!token || token === 'undefined') {
      next()
      return
    }

    // 初始化动态路由
    try {
      console.log('PM is enabled')
      const menuTreeRes = await getPermissions()
      const menuTree = menuTreeRes.data
      // 加载动态路由
      await store.dispatch('permission/generateRoutes', { menuTree })
      console.log('PM load success')
      next({ path: to.path, replace: true })
    } catch (e) {
      console.error('加载动态路由失败', e)
      next()
    }
  })
}

const isEnabled = process.env.VUE_APP_PM_ENABLED === 'true'
if (isEnabled) {
  // 注册v-permission指令
  Vue.use(permissionDirective)
  // 权限的store模块
  store.registerModule('permission', storeModule)
  // 注册路由钩子
  registerRouterHook()
}

export default {
  isEnabled,
  isInited
}
