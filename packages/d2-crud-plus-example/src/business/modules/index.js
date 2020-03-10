import exampleModule from './example/index'
import './permission' // 加载permission
import { frameInChildren } from '@/router/routes'
import asideMenu from '@/menu/aside'
import headerMenu from '@/menu/header'
import router from '@/router'
import layoutHeaderAside from '@/layout/header-aside'
// 导出静态菜单和路由
asideMenu.push(...exampleModule.menus.aside)
headerMenu.push(...exampleModule.menus.header)
frameInChildren.push(...exampleModule.routers.frameIn)

const addRoutes = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: exampleModule.routers.frameIn
  }
]
router.addRoutes(addRoutes)
