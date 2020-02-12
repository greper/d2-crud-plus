import constantRoutes, { frameInRoutes } from '../router/routes'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function formatRouter (list) {
  let routers = []
  return routers
}

function formatMenu (menuTree) {
  let menus = []
  return menus
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  inited: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.inited = true
  }
}

const actions = {
  generateRoutes ({ commit }, { roles, menuTree }) {
    return new Promise(resolve => {
      let asyncRoutes = formatRouter(menuTree)
      let accessedRoutes
      if (roles.includes('super_admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)

      const accessMenus = formatMenu(menuTree)
      const allMenuHeader = accessMenus.concat(menuHeader)
      const allMenuAside = accessMenus.concat(menuAside)
      // 处理路由 得到每一级的路由设置
      commit('d2admin/page/init', frameInRoutes.concat(accessedRoutes), { root: true })
      // 设置顶栏菜单
      commit('d2admin/menu/headerSet', allMenuHeader, { root: true })
      // 设置侧边栏菜单
      commit('d2admin/menu/asideSet', allMenuAside, { root: true })
      // 初始化菜单搜索功能
      commit('d2admin/search/init', allMenuHeader, { root: true })

      resolve(accessedRoutes)
    })
  }
}

const getters = {
  inited (state) {
    return state.inited
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
