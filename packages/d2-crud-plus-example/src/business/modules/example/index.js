const _import = require('../../utils/util.import.' + process.env.NODE_ENV) // 页面懒加载的问题修复
const viewsPrefix = 'example/views/'
const aside = [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '表单组件示例',
    icon: 'folder-o',
    children: [
      { path: '/form/date', title: '日期时间' },
      { path: '/form/select', title: '选择组件' },
      { path: '/form/slot', title: '自定义组件' },
      { path: '/form/phone', title: '国际电话输入校验' },
      { path: '/form/uploader', title: '文件上传' },
      { path: '/form/cropper', title: '图片裁剪上传' },
      { path: '/form/customType', title: '自定义字段类型' },
      { path: '/form/el', title: 'EL表单组件' },
      { path: '/form/area', title: '省市区选择组件' },
      { path: '/form/icon', title: '图标选择' },
      { path: '/form/header', title: '多级表头' },
      { path: '/form/column', title: '特殊列' },
      { path: '/form/fix', title: '固定列' },
      { path: '/form/editor', title: '富文本' },
      { path: '/form/cell', title: '行编辑' }
    ]
  },
  {
    title: '酒店示例',
    icon: 'folder-o',
    children: [
      { path: '/hotel/dashboard', title: '工作台' },
      { path: '/hotel/room/list', title: '房间管理' },
      { path: '/hotel/room/checkin', title: '入住管理' },
      { path: '/hotel/room/type', title: '房间类型管理' }
    ]
  },
  { path: '/test', title: '测试页面' }
]

const routers = {
  /**
     * 在主框架内显示
     */
  frameIn: [
    {
      path: 'test',
      name: 'test',
      meta: {
        title: '测试页面',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'test')
    },
    // form
    {
      path: 'form/header',
      name: 'formHeader',
      meta: {
        title: '多级表头',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/header')
    },
    {
      path: 'form/column',
      name: 'formColumn',
      meta: {
        title: '特殊列',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/column')
    },
    {
      path: 'form/fix',
      name: 'formFix',
      meta: {
        title: '固定列',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/fix')
    },
    {
      path: 'form/editor',
      name: 'formEditor',
      meta: {
        title: '富文本',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/editor')
    },
    {
      path: 'form/area',
      name: 'formArea',
      meta: {
        title: '省市区选择组件',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/area')
    },
    {
      path: 'form/el',
      name: 'formEl',
      meta: {
        title: 'El表单组件',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/el')
    },
    {
      path: 'form/date',
      name: 'formDate',
      meta: {
        title: '日期时间',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/date')
    },
    {
      path: 'form/select',
      name: 'formSelect',
      meta: {
        title: '选择组件',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/select')
    },
    {
      path: 'form/slot',
      name: 'formSlot',
      meta: {
        title: '插槽式自定义组件',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/slot')
    },
    {
      path: 'form/phone',
      name: 'formPhone',
      meta: {
        title: '国际电话输入框',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/phone')
    },
    {
      path: 'form/customType',
      name: 'formCustomType',
      meta: {
        title: '自定义字段类型',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/customType')
    },
    {
      path: 'form/uploader',
      name: 'formUploader',
      meta: {
        title: '文件上传',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/uploader')
    },
    {
      path: 'form/cropper',
      name: 'formCropper',
      meta: {
        title: '图片裁剪上传',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/cropper')
    },
    {
      path: 'form/icon',
      name: 'formIcon',
      meta: {
        title: '图标选择',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/icon')
    },
    {
      path: 'form/cell',
      name: 'formCell',
      meta: {
        title: '行编辑',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'form/cell')
    },
    //  酒店示例
    {
      path: 'hotel/dashboard',
      name: 'hotelDashboard',
      meta: {
        title: '工作台',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'hotel/dashboard')
    },
    {
      path: 'hotel/room/list',
      name: 'hotelRoomList',
      meta: {
        title: '房间管理',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'hotel/room/list')
    },
    {
      path: 'hotel/room/checkin',
      name: 'hotelRoomCheckin',
      meta: {
        title: '入住管理',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'hotel/room/checkin')
    },
    {
      path: 'hotel/room/type',
      name: 'hotelRoomType',
      meta: {
        title: '房间类型管理',
        auth: true,
        cache: true
      },
      component: _import(viewsPrefix + 'hotel/room/roomtype')
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
