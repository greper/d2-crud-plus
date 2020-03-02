import router from '../../../../router'
import store from '../../../../store'
import { getPermissions } from '@/business/modules/permission/lib/api'

export default {
  isEnabled () {
    return process.env.VUE_APP_PM_ENABLED === 'true'
  },
  getPlatformCode () {
    return process.env.VUE_APP_PM_PLATFORM ? process.env.VUE_APP_PM_PLATFORM : 'admin'
  },
  isInited () {
    if (!this.isEnabled()) {
      return true
    }
    return store.getters['permission/inited']
  },
  async  loadRemoteRoute () {
    const menuTreeRes = await getPermissions(this.getPlatformCode())
    const menuTree = menuTreeRes.data
    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('permission/generateRoutes', { menuTree })
    console.log('accesssRouters', accessRoutes, menuTree)
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
  }
}
