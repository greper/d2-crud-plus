import constantRoutes, { frameInRoutes } from '@/router/routes'
import StringUtils from '@/business/utils/util.string'
import layoutHeaderAside from '@/layout/header-aside'
import { menuHeader, supplementPath } from '@/menu'

/**
 * menuType 1=menu 2=btn 3=route
 * @param routers
 * @param list
 * @returns {[]}
 */
function formatRouter (parent, list) {
  if (parent == null) {
    parent = { children: [] }
  }
  list.forEach((item) => {
    let newRouter = parent
    if (item.type !== 2 && !StringUtils.isEmpty(item.component)) { // 如果是按钮 或者没有配置component，则不加入路由
      let component = null
      if (item.component === 'layoutHeaderAside') {
        component = layoutHeaderAside
      } else {
        component = () => import('@/business/modules' + item.component)
      }
      const children = parent.children
      newRouter = {
        path: item.path,
        name: item.name,
        hidden: false,
        // 动态路由支持懒加载
        component: component,
        meta: {
          title: item.title,
          auth: true,
          cache: true
        }
      }
      children.push(newRouter)
    }
    if (item.children != null && item.children.length > 0) {
      if (newRouter.children == null) {
        newRouter.children = []
      }
      formatRouter(newRouter, item.children)
    }
  })

  return parent.children
}

function formatMenu (menuTree) {
  if (menuTree == null) {
    menuTree = []
  }
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
  if (menuTree == null) {
    menuTree = []
  }
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

// export function buildRoutes (routes) {
//   return [{
//     path: '/',
//     redirect: { name: 'index' },
//     component: layoutHeaderAside,
//     children: routes
//   }]
// }

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
      const accessedRoutes = formatRouter(null, menuTree)
      const permissions = formatPermissions(menuTree, [])
      console.log('permission Routers', accessedRoutes)
      commit('SET_ROUTES', { accessedRoutes, permissions })

      const menus = supplementPath(formatMenu(menuTree))
      menuHeader.push(...menus)
      console.log('accessRouter:', accessedRoutes)

      // 处理路由 得到每一级的路由设置
      commit('d2admin/page/init', frameInRoutes.concat(accessedRoutes), { root: true })
      // 设置顶栏菜单
      commit('d2admin/menu/headerSet', menuHeader, { root: true })
      // // 设置侧边栏菜单
      // commit('d2admin/menu/asideSet', allMenuAside, { root: true })
      // 初始化菜单搜索功能
      commit('d2admin/search/init', menuHeader, { root: true })

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
