import layoutHeaderAside from '@/layout/header-aside'
const _import = require('../../utils/util.import.' + process.env.NODE_ENV) // 页面懒加载的问题修复
const viewsPrefix = 'example/views/'
const crudMenus = []
const formMenus = []
const demoRouters = []

const crudBaseMenus = addPage(crudMenus, null, '基础功能').children
const crudHandleMenus = addPage(crudMenus, null, '数据操作').children
addPage(crudBaseMenus, 'crud/demo1', '基础表格')
addPage(crudBaseMenus, 'crud/demo27', '加载状态')
addPage(crudBaseMenus, 'crud/demo28', '自定义加载状态')
addPage(crudBaseMenus, 'crud/demo2', '带斑马纹表格')
addPage(crudBaseMenus, 'crud/demo3', '带边框表格')
addPage(crudBaseMenus, 'crud/demo4', '带状态表格')
addPage(crudBaseMenus, 'crud/demo5', '固定表头')
addPage(crudBaseMenus, 'crud/demo6', '固定列')
addPage(crudBaseMenus, 'crud/demo7', '流体高度')
addPage(crudBaseMenus, 'crud/demo8', '多级表头')
addPage(crudBaseMenus, 'crud/demo9', '单选')
addPage(crudBaseMenus, 'crud/demo10', '多选')
addPage(crudBaseMenus, 'crud/demo11', '排序')
addPage(crudBaseMenus, 'crud/demo12', '筛选')
addPage(crudBaseMenus, 'crud/demo13', '表尾合计行')
addPage(crudBaseMenus, 'crud/demo14', '合并行')
addPage(crudBaseMenus, 'crud/demo15', '合并列')
addPage(crudBaseMenus, 'crud/demo24', '表格slot')

addPage(crudHandleMenus, 'crud/demo29', '分页')
addPage(crudHandleMenus, 'crud/demo16', '新增数据')
addPage(crudHandleMenus, 'crud/demo17', '修改数据')
addPage(crudHandleMenus, 'crud/demo18', '删除数据')
addPage(crudHandleMenus, 'crud/demo19', '自定义操作列')
addPage(crudHandleMenus, 'crud/demo20', '表单组件渲染')
addPage(crudHandleMenus, 'crud/demo21', '表单布局')
addPage(crudHandleMenus, 'crud/demo22', '表单校验')
addPage(crudHandleMenus, 'crud/demo23', '表格内编辑')
addPage(crudHandleMenus, 'crud/demo25', '表格自定义组件')
addPage(crudHandleMenus, 'crud/demo30', '表单事件监听')
addPage(crudHandleMenus, 'crud/demo26', '表单自定义组件')
addPage(crudHandleMenus, 'crud/demo31', 'CRUD事件')

addPage(formMenus, 'form/date', '日期时间')
addPage(formMenus, 'form/select', '选择组件', '禁用选项，染色')
addPage(formMenus, 'form/phone', '国际电话输入框')
const uploadGroupMenu = addPage(formMenus, null, '文件上传')
const uploadMenus = uploadGroupMenu.children
addPage(uploadMenus, 'form/uploader', '文件上传')
addPage(uploadMenus, 'form/cropper', '图片裁剪上传')
addPage(uploadMenus, 'form/uploader/form', '表单上传')
addPage(uploadMenus, 'form/uploader/cos', '腾讯云上传')
addPage(uploadMenus, 'form/uploader/alioss', '阿里云上传')
addPage(uploadMenus, 'form/uploader/qiniu', '七牛上传')

addPage(formMenus, 'form/el', 'EL表单组件')
addPage(formMenus, 'form/area', '省市区选择组件', '懒加载')
addPage(formMenus, 'form/tree', '树形组件')

addPage(formMenus, 'form/icon', '图标选择')
addPage(formMenus, 'form/editor', '富文本')
addPage(formMenus, 'form/independent', '组件独立使用', 'new')

const enhanceMenus = []

const elGroupMenu = addPage(enhanceMenus, null, 'elTable功能')
const elMenus = elGroupMenu.children

addPage(elMenus, 'form/header', '多级表头')
addPage(elMenus, 'form/column', '特殊列')
addPage(elMenus, 'form/fix', '固定列')

const d2pGroupMenu = addPage(enhanceMenus, null, '增强示例', 'new')
const d2pMenus = d2pGroupMenu.children
addPage(d2pMenus, 'form/fromBackend', '后台获取CRUD', 'new')
addPage(d2pMenus, 'form/customType', '自定义字段类型')
addPage(d2pMenus, 'form/toolbar', '工具条')
addPage(d2pMenus, 'form/batchDel', '批量删除')
addPage(d2pMenus, 'form/view', '查看')
addPage(d2pMenus, 'form/deepData', '多级数据')
addPage(d2pMenus, 'form/export', '数据导出')
addPage(d2pMenus, 'form/searchOrder', '查询排序')
addPage(d2pMenus, 'form/localPagination', '前端分页')
addPage(d2pMenus, 'form/slot', '自定义组件', '按钮排序')
addPage(d2pMenus, 'form/noPagination', '隐藏翻页')

const rowHandleGroupMenu = addPage(enhanceMenus, null, '操作列')
const rowHandleMenus = rowHandleGroupMenu.children
addPage(rowHandleMenus, 'form/rowHandleDropdown', '操作按钮折叠', 'new')
addPage(rowHandleMenus, 'form/rowHandleHide', '隐藏操作列')

const lineEditGroupMenu = addPage(enhanceMenus, null, '行编辑')
const lineEditMenus = lineEditGroupMenu.children
addPage(lineEditMenus, 'form/lineEdit', '行编辑高级版', 'new')
addPage(lineEditMenus, 'form/cell', '行编辑普通版')

const formGroupMenu = addPage(enhanceMenus, null, '表单相关')
const formEditMenus = formGroupMenu.children
addPage(formEditMenus, 'form/drawer', '抽屉表单')
addPage(formEditMenus, 'form/nestTable', '嵌套表格')
addPage(formEditMenus, 'form/validation', '表单校验')
addPage(formEditMenus, 'form/group', '表单分组')
addPage(formEditMenus, 'form/addi', '动态添加表单字段')
addPage(formEditMenus, 'form/show', '显隐只读')
addPage(formEditMenus, 'form/disabled', '禁用启用', '行内禁用')
addPage(formEditMenus, 'form/linkage', '选择联动')

const otherGroupMenu = addPage(enhanceMenus, null, '其他')
const otherMenus = otherGroupMenu.children
addPage(otherMenus, 'form/d2crud', 'd2Crud原版')
addPage(otherMenus, 'form/old', '旧版页面', '兼容')

const vxeMenus = []
addPage(vxeMenus, 'vxe/column', 'vxe-table', 'beta')

const hotelMenus = []
addPage(hotelMenus, 'hotel/dashboard', '工作台')
addPage(hotelMenus, 'hotel/room/list', '房间管理')
addPage(hotelMenus, 'hotel/room/checkin', '入住管理')
addPage(hotelMenus, 'hotel/room/roomtype', '房间类型管理')

function addPage (menuGroup, path, title, badge) {
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
    // icon: 'el-file-o'
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
        title: 'd2-crud-x',
        icon: 'folder-o',
        children: crudMenus
      },
      {
        title: '表单组件示例',
        icon: 'folder-o',
        children: formMenus
      },
      {
        title: '进阶示例',
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
