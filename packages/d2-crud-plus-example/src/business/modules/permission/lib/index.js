import router from '../../../../router'
import store from '../../../../store'
import { getUserInfo, getPermissions } from '@/business/modules/permission/lib/api'

export default {
  isEnabled () {
    return process.env.VUE_APP_PM_ENABLED
  },
  isInited () {
    if (!this.isEnabled()) {
      return true
    }
    return store.getters['permission/inited']
  },
  async  loadRemoteRoute () {
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    // const { roles } = await store.dispatch('d2admin/user/roles')
    const userInfoRes = await getUserInfo()
    const userInfo = userInfoRes.data
    const menuTreeRes = await getPermissions()
    const menuTree = menuTreeRes.data
    const roles = userInfo.roles
    userInfo.name = userInfo.nickName != null ? userInfo.nickName : userInfo.username
    await store.dispatch('d2admin/user/set', userInfo, { root: true })

    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, menuTree })
    console.log('accesssRouters', accessRoutes, userInfo, menuTree, roles)
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)
  }
}
