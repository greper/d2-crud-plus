import exampleModule from './example/index'
import './permission' // 加载permission

// 导出静态菜单和路由
let asides = exampleModule.menus.aside
let headers = exampleModule.menus.header
let frameIn = exampleModule.routers.frameIn
export default {
  menus: {
    aside: asides,
    header: headers
  },
  routers: {
    frameIn: frameIn,
    frameOut: [],
    errorPage: []
  }
}
