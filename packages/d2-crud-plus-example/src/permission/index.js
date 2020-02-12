import router from '../router'
import store from '../store'
// 进度条
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import { getUserInfo, getPermissions } from '@/permission/api'
export default {
  async doNext (next, to) {
    const inited = store.getters['permission/inited']
    if (inited) {
      next()
    } else {
      try {
        // get user info
        // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        // const { roles } = await store.dispatch('d2admin/user/roles')
        const userInfoRes = await getUserInfo()
        const userInfo = userInfoRes.data
        const menuTreeRes = await getPermissions()
        const menuTree = menuTreeRes.data
        const roles = userInfo.roles
        console.log('accesssRouters', userInfo, menuTree, roles)
        await store.dispatch('d2admin/user/set', userInfo, { root: true })

        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, menuTree })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        console.log('router error ', error)
        // remove token and go to login page to re-login
        // await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
}
