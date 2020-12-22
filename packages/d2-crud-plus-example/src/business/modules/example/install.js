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
addPage(uploadMenus, 'form/uploader/form', '本地上传')
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
addPage(enhanceMenus, 'form/d2crud', 'd2Crud原版')
addPage(enhanceMenus, 'form/fromBackend', '后台获取CRUD配置', 'new')
addPage(enhanceMenus, 'form/rowHandleDropdown', '操作按钮折叠', 'new')
addPage(enhanceMenus, 'form/lineEdit', '行编辑高级版', 'new')
addPage(enhanceMenus, 'form/drawer', '抽屉表单')
addPage(enhanceMenus, 'form/localPagination', '前端分页')
addPage(enhanceMenus, 'form/export', '数据导出')
addPage(enhanceMenus, 'form/searchOrder', '查询排序')
addPage(enhanceMenus, 'form/nestTable', '嵌套表格')
addPage(enhanceMenus, 'form/deepData', '多级数据')
addPage(enhanceMenus, 'form/view', '查看')
addPage(enhanceMenus, 'form/linkage', '选择联动')
addPage(enhanceMenus, 'form/toolbar', '工具条')
addPage(enhanceMenus, 'form/old', '旧版页面', '兼容')
addPage(enhanceMenus, 'form/slot', '自定义组件', '按钮排序')
addPage(enhanceMenus, 'form/customType', '自定义字段类型')
addPage(enhanceMenus, 'form/header', '多级表头')
addPage(enhanceMenus, 'form/column', '特殊列')
addPage(enhanceMenus, 'form/batchDel', '批量删除')
addPage(enhanceMenus, 'form/fix', '固定列')
addPage(enhanceMenus, 'form/cell', '行编辑')
addPage(enhanceMenus, 'form/validation', '表单校验')
addPage(enhanceMenus, 'form/group', '表单分组')
addPage(enhanceMenus, 'form/addi', '动态添加表单字段')
addPage(enhanceMenus, 'form/show', '显隐只读')
addPage(enhanceMenus, 'form/disabled', '禁用启用', '行内禁用')
addPage(enhanceMenus, 'form/rowHandleHide', '隐藏操作列')
addPage(enhanceMenus, 'form/noPagination', '隐藏翻页')

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
