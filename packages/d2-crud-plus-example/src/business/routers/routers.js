// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('./util.import.' + process.env.NODE_ENV)
/**
 * 在主框架内显示
 */
export const businessFrameIn = [
  {
    path: 'test',
    name: 'test',
    meta: {
      title: '测试页面',
      auth: true
    },
    component: _import('test')
  },
  // form
  {
    path: 'form/area',
    name: 'formArea',
    meta: {
      title: '省市区选择组件',
      auth: true
    },
    component: _import('form/area')
  },
  {
    path: 'form/el',
    name: 'formEl',
    meta: {
      title: 'El表单组件',
      auth: true
    },
    component: _import('form/el')
  },
  {
    path: 'form/date',
    name: 'formDate',
    meta: {
      title: '日期时间',
      auth: true
    },
    component: _import('form/date')
  },
  {
    path: 'form/select',
    name: 'formSelect',
    meta: {
      title: '选择组件',
      auth: true
    },
    component: _import('form/select')
  },
  {
    path: 'form/slot',
    name: 'formSlot',
    meta: {
      title: '插槽式自定义组件',
      auth: true
    },
    component: _import('form/slot')
  },
  {
    path: 'form/phone',
    name: 'formPhone',
    meta: {
      title: '国际电话输入框',
      auth: true
    },
    component: _import('form/phone')
  },
  {
    path: 'form/customType',
    name: 'formCustomType',
    meta: {
      title: '自定义字段类型',
      auth: true
    },
    component: _import('form/customType')
  },
  {
    path: 'form/uploader',
    name: 'formUploader',
    meta: {
      title: '文件上传',
      auth: true
    },
    component: _import('form/uploader')
  },
  //  酒店示例
  {
    path: 'hotel/dashboard',
    name: 'hotelDashboard',
    meta: {
      title: '工作台',
      auth: true
    },
    component: _import('hotel/dashboard')
  },
  {
    path: 'hotel/room/list',
    name: 'hotelRoomList',
    meta: {
      title: '房间管理',
      auth: true
    },
    component: _import('hotel/room/list')
  },
  {
    path: 'hotel/room/checkin',
    name: 'hotelRoomCheckin',
    meta: {
      title: '入住管理',
      auth: true
    },
    component: _import('hotel/room/checkin')
  },
  {
    path: 'hotel/room/type',
    name: 'hotelRoomtype',
    meta: {
      title: '房间类型管理',
      auth: true
    },
    component: _import('hotel/room/roomtype')
  }
]

/**
 * 在主框架之外显示
 */
export const businessFrameOut = [

]

/**
 * 错误页面
 */
export const businessErrorPage = [
]
