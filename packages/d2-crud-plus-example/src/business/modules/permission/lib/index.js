import router from '@/router'
import store from '@/store'
import { getPermissions } from './api'
import util from '@/libs/util'
import RouterHook from '@/router/router.hook'
import Vue from 'vue'
import permissionDirective from '../directive/permission'
import storeModule from './permission.store'

const isEnabled = process.env.VUE_APP_PM_ENABLED === 'true'
const platformCode = process.env.VUE_APP_PM_PLATFORM ? process.env.VUE_APP_PM_PLATFORM : 'admin'
function isInited () {
  if (!isEnabled) {
    console.warn('PM is disabled')
    return true
  }
  return store.getters['permission/inited']
}
async function loadRemoteRoute () {
  const menuTreeRes = await getPermissions(platformCode)
  console.log('Menu Tree api  response:', menuTreeRes)
  const menuTree = menuTreeRes.data
  // generate accessible routes map based on roles
  const accessRoutes = await store.dispatch('permission/generateRoutes', { menuTree })
  console.log('accesssRouters', accessRoutes, menuTree)
  // dynamically add accessible routes
  router.addRoutes(accessRoutes)
}

if (isEnabled) {
  Vue.use(permissionDirective)
  store.registerModule('permission', storeModule)
}

RouterHook.beforeEach = async (to, from, next) => {
// 初始化动态路由
  if (isEnabled && !isInited()) {
    console.log('PM is enabled')
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      try {
        await loadRemoteRoute()
      } catch (e) {
        console.error('加载动态路由失败', e)
        next()
        return
      }
      next({ path: to.path, replace: true })
    }
  }
}
export default {
  isEnabled,
  isInited
}
