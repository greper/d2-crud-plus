import exampleModule from './example/index'
import './permission' // 加载permission
import { frameInChildren } from '@/router/routes'
import asideMenu from '@/menu/aside'
import headerMenu from '@/menu/header'
// 导出静态菜单和路由
asideMenu.push(...exampleModule.menus.aside)
headerMenu.push(...exampleModule.menus.header)
frameInChildren.push(...exampleModule.routers.frameIn)
