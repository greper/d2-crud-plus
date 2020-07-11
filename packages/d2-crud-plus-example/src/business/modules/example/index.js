import layoutHeaderAside from '@/layout/header-aside'
const _import = require('../../utils/util.import.' + process.env.NODE_ENV) // 页面懒加载的问题修复
const viewsPrefix = 'example/views/'
const aside = [
  {
    title: '示例',
    icon: 'folder-o',
    path: '/demo',
    children: [
      {
        title: '表单组件示例',
        icon: 'folder-o',
        children: [
          { path: '/demo/form/date', title: '日期时间' },
          { path: '/demo/form/select', title: '选择组件' },
          { path: '/demo/form/phone', title: '国际电话输入框' },
          {
            title: '文件上传',
            children: [
              { path: '/demo/form/uploader', title: '文件上传' },
              { path: '/demo/form/cropper', title: '图片裁剪上传' },
              { path: '/demo/form/uploader/form', title: '本地上传' },
              { path: '/demo/form/uploader/cos', title: '腾讯云上传' },
              { path: '/demo/form/uploader/alioss', title: '阿里云上传' },
              { path: '/demo/form/uploader/qiniu', title: '七牛上传' }
            ]
          },
          { path: '/demo/form/el', title: 'EL表单组件' },
          { path: '/demo/form/area', title: '省市区选择组件' },
          { path: '/demo/form/icon', title: '图标选择' },
          { path: '/demo/form/editor', title: '富文本' }

        ]
      },
      {
        title: 'CRUD增强功能',
        icon: 'folder-o',
        children: [
          { path: '/demo/form/d2crud', title: 'd2Crud原版' },
          { path: '/demo/form/toolbar', title: '工具条', badge: 'new' },
          { path: '/demo/form/slot', title: '自定义组件' },
          { path: '/demo/form/customType', title: '自定义字段类型' },
          { path: '/demo/form/header', title: '多级表头' },
          { path: '/demo/form/column', title: '特殊列' },
          { path: '/demo/form/fix', title: '固定列' },
          { path: '/demo/form/cell', title: '行编辑' },
          { path: '/demo/form/validation', title: '表单校验' },
          { path: '/demo/form/group', title: '表单分组' },
          { path: '/demo/form/addi', title: '动态添加表单字段' },
          { path: '/demo/form/show', title: '显隐只读' },
          { path: '/demo/form/disabled', title: '禁用启用' }
        ]
      },
      {
        title: '酒店示例',
        icon: 'folder-o',
        path: 'hotel',
        children: [
          { path: '/demo/hotel/dashboard', title: '工作台' },
          { path: '/demo/hotel/room/list', title: '房间管理' },
          { path: '/demo/hotel/room/checkin', title: '入住管理' },
          { path: '/demo/hotel/room/type', title: '房间类型管理' }
        ]
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
      name: 'form',
      meta: { auth: true },
      redirect: { name: '/form/select' },
      component: layoutHeaderAside,
      children: [
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
          path: 'form/toolbar',
          name: 'formToolbar',
          meta: {
            title: '工具条',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/toolbar')
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
          path: 'form/validation',
          name: 'formValidation',
          meta: {
            title: '表单校验',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/validation')
        },
        {
          path: 'form/group',
          name: 'formGroup',
          meta: {
            title: '表单分组',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/group')
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
          path: 'form/show',
          name: 'formShow',
          meta: {
            title: '动态显隐',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/show')
        },
        {
          path: 'form/disabled',
          name: 'formDisabled',
          meta: {
            title: '禁用启用',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/disabled')
        },
        {
          path: 'form/slot',
          name: 'formSlot',
          meta: {
            title: '自定义组件',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/slot')
        },
        {
          path: 'form/addi',
          name: 'formAddi',
          meta: {
            title: '动态添加表单字段',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/addi')
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
          path: 'form/uploader/form',
          name: 'formUploaderForm',
          meta: {
            title: '本地上传',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/uploader/form')
        },
        {
          path: 'form/uploader/cos',
          name: 'formUploaderCos',
          meta: {
            title: '腾讯云上传',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/uploader/cos')
        },
        {
          path: 'form/uploader/alioss',
          name: 'formUploaderAlioss',
          meta: {
            title: '阿里云上传',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/uploader/alioss')
        },
        {
          path: 'form/uploader/qiniu',
          name: 'formUploaderQiniu',
          meta: {
            title: '七牛上传',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/uploader/qiniu')
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
        {
          path: 'form/d2crud',
          name: 'formD2crud',
          meta: {
            title: 'd2Crud原版',
            auth: true,
            cache: true
          },
          component: _import(viewsPrefix + 'form/d2crud')
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
  ]
}

export default {
  menus: {
    aside: aside,
    header: []
  },
  routers: routers
}
