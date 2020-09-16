import constantRoutes, { frameInRoutes } from '@/router/routes'
import StringUtils from '@/business/utils/util.string'
import layoutHeaderAside from '@/layout/header-aside'
import { menuHeader, supplementPath } from '@/menu'
import router from '@/router'
const StaticMenuHeader = [...menuHeader] // 静态菜单暂存，重新登录后，需要重新加载动态菜单与此处的静态菜单合并
/**
 * 构建路由列表
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

/**
 * 构建菜单
 * @param menuTree
 * @returns {[]}
 */
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

/**
 * 构建权限码列表
 * @param menuTree
 * @param permissionList
 * @returns {*}
 */
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

const state = {
  routes: [],
  addRoutes: [],
  permissions: [],
  inited: false
}

const mutations = {
  setRoutes: (state, { accessedRoutes: routes, permissions }) => {
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
  generateRoutes ({ rootState, state, commit }, { menuTree }) {
    return new Promise(resolve => {
      // 处理路由
      const accessedRoutes = formatRouter(null, menuTree) // 根据后台获取到的资源树构建路由列表
      const permissions = formatPermissions(menuTree, []) // 从资源树中抽取权限code列表
      commit('setRoutes', { accessedRoutes, permissions }) // 将菜单和权限存储到vuex里面
      router.addRoutes(accessedRoutes) // 添加动态路由
      // 处理路由 得到每一级的路由设置
      commit('d2admin/page/init', frameInRoutes.concat(accessedRoutes), { root: true })

      // 处理菜单
      const menus = supplementPath(formatMenu(menuTree)) // 根据后台获取的资源树，构建菜单
      menuHeader.splice(0, menuHeader.length)
      menuHeader.push(...StaticMenuHeader) // 重新构建菜单列表
      menuHeader.push(...menus) // 将动态菜单放进去

      // 重新设置顶栏菜单
      commit('d2admin/menu/headerSet', menuHeader, { root: true })
      // 重新设置侧边栏菜单
      if (rootState.d2admin.menu.asideSet == null) {
        const defaultMenuIndex = parseInt(process.env.VUE_APP_D2P_MENU_DEFAULT)
        if (defaultMenuIndex >= 0) {
          console.log('加载默认左侧菜单：VUE_APP_D2P_MENU_DEFAULT=', defaultMenuIndex)
          commit('d2admin/menu/asideSet', menuHeader[defaultMenuIndex].children, { root: true })
        } else {
          console.warn('默认左侧菜单未配置：VUE_APP_D2P_MENU_DEFAULT=', process.env.VUE_APP_D2P_MENU_DEFAULT)
        }
      }
      // 重新初始化菜单搜索功能
      commit('d2admin/search/init', menuHeader, { root: true })

      resolve(true)
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
