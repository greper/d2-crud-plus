import layoutHeaderAside from '@/layout/header-aside'
const _import = require('../../utils/util.import.' + process.env.NODE_ENV) // 页面懒加载的问题修复
const viewsPrefix = 'example/views/'
const crudMenus = []
const formMenus = []
const demoRouters = []

const crudBaseMenus = addFunction(crudMenus, null, '基础功能').children
const crudHandleMenus = addFunction(crudMenus, null, '数据操作').children
addFunction(crudBaseMenus, 'crud/demo1', '基础表格')
addFunction(crudBaseMenus, 'crud/demo27', '加载状态')
addFunction(crudBaseMenus, 'crud/demo28', '自定义加载状态')
addFunction(crudBaseMenus, 'crud/demo2', '带斑马纹表格')
addFunction(crudBaseMenus, 'crud/demo3', '带边框表格')
addFunction(crudBaseMenus, 'crud/demo4', '带状态表格')
addFunction(crudBaseMenus, 'crud/demo5', '固定表头')
addFunction(crudBaseMenus, 'crud/demo6', '固定列')
addFunction(crudBaseMenus, 'crud/demo7', '流体高度')
addFunction(crudBaseMenus, 'crud/demo8', '多级表头')
addFunction(crudBaseMenus, 'crud/demo9', '单选')
addFunction(crudBaseMenus, 'crud/demo10', '多选')
addFunction(crudBaseMenus, 'crud/demo11', '排序')
addFunction(crudBaseMenus, 'crud/demo12', '筛选')
addFunction(crudBaseMenus, 'crud/demo13', '表尾合计行')
addFunction(crudBaseMenus, 'crud/demo14', '合并行')
addFunction(crudBaseMenus, 'crud/demo15', '合并列')
addFunction(crudBaseMenus, 'crud/demo24', '表格slot')

addFunction(crudHandleMenus, 'crud/demo29', '分页')
addFunction(crudHandleMenus, 'crud/demo16', '新增数据')
addFunction(crudHandleMenus, 'crud/demo17', '修改数据')
addFunction(crudHandleMenus, 'crud/demo18', '删除数据')
addFunction(crudHandleMenus, 'crud/demo19', '自定义操作列')
addFunction(crudHandleMenus, 'crud/demo20', '表单组件渲染')
addFunction(crudHandleMenus, 'crud/demo21', '表单布局')
addFunction(crudHandleMenus, 'crud/demo22', '表单校验')
addFunction(crudHandleMenus, 'crud/demo23', '表格内编辑')
addFunction(crudHandleMenus, 'crud/demo25', '表格自定义组件')
addFunction(crudHandleMenus, 'crud/demo30', '表单事件监听')
addFunction(crudHandleMenus, 'crud/demo26', '表单自定义组件')
addFunction(crudHandleMenus, 'crud/demo31', 'CRUD事件')

addFunction(formMenus, 'form/date', '日期时间')
addFunction(formMenus, 'form/select', '选择组件', '禁用选项，染色')
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
addFunction(formMenus, 'form/tree', '树形组件')

addFunction(formMenus, 'form/icon', '图标选择')
addFunction(formMenus, 'form/editor', '富文本')
addFunction(formMenus, 'form/independent', '组件独立使用', 'new')

const enhanceMenus = []
addFunction(enhanceMenus, 'form/d2crud', 'd2Crud原版')
addFunction(enhanceMenus, 'form/export', '数据导出', 'new')
addFunction(enhanceMenus, 'form/searchOrder', '查询排序', 'new')
addFunction(enhanceMenus, 'form/nestTable', '嵌套表格')
addFunction(enhanceMenus, 'form/deepData', '多级数据')
addFunction(enhanceMenus, 'form/view', '查看')
addFunction(enhanceMenus, 'form/linkage', '选择联动')
addFunction(enhanceMenus, 'form/toolbar', '工具条')
addFunction(enhanceMenus, 'form/old', '旧版页面', '兼容')
addFunction(enhanceMenus, 'form/slot', '自定义组件', '按钮排序')
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
addFunction(enhanceMenus, 'form/disabled', '禁用启用', '行内禁用')
addFunction(enhanceMenus, 'form/rowHandleHide', '隐藏操作列')
addFunction(enhanceMenus, 'form/noPagination', '隐藏翻页')

const vxeMenus = []
addFunction(vxeMenus, 'vxe/column', 'vxe-table', 'beta')

const hotelMenus = []
addFunction(hotelMenus, 'hotel/dashboard', '工作台')
addFunction(hotelMenus, 'hotel/room/list', '房间管理')
addFunction(hotelMenus, 'hotel/room/checkin', '入住管理')
addFunction(hotelMenus, 'hotel/room/roomtype', '房间类型管理')

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
