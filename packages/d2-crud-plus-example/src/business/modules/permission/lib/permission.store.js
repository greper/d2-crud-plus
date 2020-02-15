import constantRoutes, { frameInRoutes } from '@/router/routes'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import StringUtils from '@/business/utils/util.string'
import layoutHeaderAside from '@/layout/header-aside'

const _import = require('@/business/routers/util.import')

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

/**
 * menuType 1=menu 2=btn 3=route
 * @param routers
 * @param list
 * @returns {[]}
 */
function formatRouter (routers, list) {
  list.forEach((item) => {
    if (item.children != null && item.children.length > 0) {
      formatRouter(routers, item.children)
    }

    if (item.type === 2 || StringUtils.isEmpty(item.path) || StringUtils.isEmpty(item.component)) { // 如果是按钮，则不加入路由
      return
    }
    routers.push({
      path: item.path,
      name: item.name,
      hidden: false,
      component: _import(item.component),
      meta: {
        title: item.title,
        auth: true
      }
    })
  })

  return routers
}

function formatMenu (menuTree) {
  let menus = []
  menuTree.forEach((item) => {
    if (item.type !== 1) { // 只有菜单类型才加入
      return
    }
    let children
    if (item.children != null && item.children.length > 0) {
      children = formatMenu(item.children)
    }
    menus.push({ path: item.path, title: item.title, children: children })
  })
  if (menus.length === 0) {
    menus = undefined
  }
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

  return [{
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: res
  }]
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
  },
  clear: () => {
    state.addRoutes = []
    state.routes = []
    state.inited = false
  }
}

const actions = {
  generateRoutes ({ commit }, { roles, menuTree: resourceList }) {
    return new Promise(resolve => {
      let asyncRoutes = formatRouter([], resourceList)
      let accessedRoutes
      if (roles.includes('super_admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)

      const accessMenus = formatMenu(resourceList)
      const allMenuHeader = menuHeader
      const allMenuAside = menuAside.concat(accessMenus)
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
  },
  clear ({ commit }) {
    commit('clear')
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
