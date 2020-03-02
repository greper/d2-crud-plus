import constantRoutes, { frameInRoutes } from '@/router/routes'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import StringUtils from '@/business/utils/util.string'
import layoutHeaderAside from '@/layout/header-aside'

const _import = require('@/business/routers/util.import')

/**
 * menuType 1=menu 2=btn 3=route
 * @param routers
 * @param list
 * @returns {[]}
 */
function formatRouter (routers, list) {
  list.forEach((item) => {
    if (item.type !== 2 && !StringUtils.isEmpty(item.path) && !StringUtils.isEmpty(item.component)) { // 如果是按钮 或者没有配置path，则不加入路由
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
    }
    if (item.children != null && item.children.length > 0) {
      formatRouter(routers, item.children)
    }
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
    let icon
    if (item.icon != null && item.icon !== '') {
      icon = item.icon
    }
    menus.push({ path: item.path, title: item.title, icon: icon, children: children })
  })
  if (menus.length === 0) {
    menus = undefined
  }
  return menus
}

function formatPermissions (menuTree, permissionList) {
  menuTree.forEach((item) => {
    if (item.permission != null && item.permission !== '') { // 权限为空
      permissionList.push(item.permission)
    }
    if (item.children != null && item.children.length > 0) {
      formatPermissions(item.children, permissionList)
    }
  })
  return permissionList
}

export function buildRoutes (routes) {
  return [{
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: routes
  }]
}

const state = {
  routes: [],
  addRoutes: [],
  permissions: [],
  inited: false
}

const mutations = {
  SET_ROUTES: (state, { accessedRoutes: routes, permissions }) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    state.inited = true
    state.permissions = permissions
  },
  clear: () => {
    state.addRoutes = []
    state.routes = []
    state.inited = false
    state.permissions = []
  }
}

const actions = {
  generateRoutes ({ commit }, { menuTree }) {
    return new Promise(resolve => {
      let asyncRoutes = formatRouter([], menuTree)
      let accessedRoutes = buildRoutes(asyncRoutes)
      const permissions = formatPermissions(menuTree, [])
      commit('SET_ROUTES', { accessedRoutes, permissions })

      const menus = formatMenu(menuTree)
      const accessMenus = {
        aside: menus[0].children,
        header: menus[1].children
      }
      const allMenuHeader = accessMenus.header != null ? menuHeader.concat(accessMenus.header) : menuHeader
      const allMenuAside = accessMenus.aside != null ? menuAside.concat(accessMenus.aside) : menuAside
      console.log('accessRouter:', accessedRoutes)
      console.log('menuHeader:', allMenuHeader)
      console.log('menuAside:', allMenuAside)

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
  },
  permissions (state) {
    return state.permissions
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
