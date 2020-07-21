import layoutHeaderAside from '@/layout/header-aside'
const _import = require('../../utils/util.import.' + process.env.NODE_ENV) // 页面懒加载的问题修复
const viewsPrefix = 'example/views/'

const formMenus = []
const demoRouters = []

addFunction(formMenus, 'form/date', '日期时间')
addFunction(formMenus, 'form/select', '选择组件')
addFunction(formMenus, 'form/phone', '国际电话输入框')
const uploadGroupMenu = addFunction(formMenus, null, '文件上传')
const uploadMenus = uploadGroupMenu.children
addFunction(uploadMenus, 'form/uploader', '文件上传')
addFunction(uploadMenus, 'form/cropper', '图片裁剪上传')
addFunction(uploadMenus, 'form/uploader/form', '本地上传')
addFunction(uploadMenus, 'form/uploader/cos', '腾讯云上传')
addFunction(uploadMenus, 'form/uploader/alioss', '阿里云上传')
addFunction(uploadMenus, 'form/uploader/qiniu', '七牛上传')

addFunction(formMenus, 'form/el', 'EL表单组件')
addFunction(formMenus, 'form/area', '省市区选择组件')
addFunction(formMenus, 'form/icon', '图标选择')
addFunction(formMenus, 'form/editor', '富文本')

const enhanceMenus = []
addFunction(enhanceMenus, 'form/d2crud', 'd2Crud原版')
addFunction(enhanceMenus, 'form/linkage', '选择联动', 'new')
addFunction(enhanceMenus, 'form/toolbar', '工具条', 'new')
addFunction(enhanceMenus, 'form/old', '旧版页面', '兼容')
addFunction(enhanceMenus, 'form/slot', '自定义组件')
addFunction(enhanceMenus, 'form/customType', '自定义字段类型')
addFunction(enhanceMenus, 'form/header', '多级表头')
addFunction(enhanceMenus, 'form/column', '特殊列')
addFunction(enhanceMenus, 'form/batchDel', '批量删除')
addFunction(enhanceMenus, 'form/fix', '固定列')
addFunction(enhanceMenus, 'form/cell', '行编辑')
addFunction(enhanceMenus, 'form/validation', '表单校验')
addFunction(enhanceMenus, 'form/group', '表单分组')
addFunction(enhanceMenus, 'form/addi', '动态添加表单字段')
addFunction(enhanceMenus, 'form/show', '显隐只读')
addFunction(enhanceMenus, 'form/disabled', '禁用启用')

const vxeMenus = []
addFunction(vxeMenus, 'vxe/column', 'vxe-table', 'beta')

const hotelMenus = []
addFunction(hotelMenus, 'hotel/dashboard', '工作台')
addFunction(hotelMenus, 'hotel/room/list', '房间管理')
addFunction(hotelMenus, 'hotel/room/checkin', '入住管理')
addFunction(hotelMenus, 'hotel/room/type', '房间类型管理')

function addFunction (menuGroup, path, title, badge) {
  if (path == null) {
    const menu = {
      title: title,
      children: []
    }
    if (badge != null) {
      menu.badge = badge
    }
    menuGroup.push(menu)
    return menu
  }

  const menu = {
    path: '/demo/' + path,
    title: title
  }
  if (badge != null) {
    menu.badge = badge
  }
  const arr = path.split('/')
  let name = ''
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      name += arr[i]
    } else {
      name += arr[i].charAt(0).toUpperCase()
      name += arr[i].substring(1)
    }
  }

  menuGroup.push(menu)
  demoRouters.push({
    path: path,
    name: name,
    meta: {
      title: title,
      auth: true,
      cache: true
    },
    component: _import(viewsPrefix + path)
  })
  return menu
}

const aside = [
  {
    title: '示例',
    icon: 'folder-o',
    path: '/demo',
    children: [
      {
        title: '表单组件示例',
        icon: 'folder-o',
        children: formMenus
      },
      {
        title: 'CRUD增强功能',
        icon: 'folder-o',
        children: enhanceMenus
      },
      {
        title: 'vxe-table',
        icon: 'folder-o',
        children: vxeMenus
      },
      {
        title: '酒店示例',
        icon: 'folder-o',
        path: 'hotel',
        children: hotelMenus
      }
    ]
  }
]

const routers = {
  /**
     * 在主框架内显示
     */
  frameIn: [
    {
      path: '/demo',
      name: 'demo',
      meta: { auth: true },
      redirect: { name: '/form/select' },
      component: layoutHeaderAside,
      children: demoRouters
    }
  ]
}

export default {
  menus: {
    aside: aside,
    header: []
  },
  routers: routers
}
