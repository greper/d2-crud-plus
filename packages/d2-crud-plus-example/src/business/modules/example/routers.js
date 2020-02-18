const _import = require('@/business/routers/util.import')
const viewsPrefix = 'example/views/'
export default {
  /**
   * 在主框架内显示
   */
  frameIn: [
    {
      path: 'test',
      name: 'test',
      meta: {
        title: '测试页面',
        auth: true
      },
      component: _import(viewsPrefix + 'test')
    },
    // form
    {
      path: 'form/area',
      name: 'formArea',
      meta: {
        title: '省市区选择组件',
        auth: true
      },
      component: _import(viewsPrefix + 'form/area')
    },
    {
      path: 'form/el',
      name: 'formEl',
      meta: {
        title: 'El表单组件',
        auth: true
      },
      component: _import(viewsPrefix + 'form/el')
    },
    {
      path: 'form/date',
      name: 'formDate',
      meta: {
        title: '日期时间',
        auth: true
      },
      component: _import(viewsPrefix + 'form/date')
    },
    {
      path: 'form/select',
      name: 'formSelect',
      meta: {
        title: '选择组件',
        auth: true
      },
      component: _import(viewsPrefix + 'form/select')
    },
    {
      path: 'form/slot',
      name: 'formSlot',
      meta: {
        title: '插槽式自定义组件',
        auth: true
      },
      component: _import(viewsPrefix + 'form/slot')
    },
    {
      path: 'form/phone',
      name: 'formPhone',
      meta: {
        title: '国际电话输入框',
        auth: true
      },
      component: _import(viewsPrefix + 'form/phone')
    },
    {
      path: 'form/customType',
      name: 'formCustomType',
      meta: {
        title: '自定义字段类型',
        auth: true
      },
      component: _import(viewsPrefix + 'form/customType')
    },
    {
      path: 'form/uploader',
      name: 'formUploader',
      meta: {
        title: '文件上传',
        auth: true
      },
      component: _import(viewsPrefix + 'form/uploader')
    },
    {
      path: 'form/icon',
      name: 'formIcon',
      meta: {
        title: '图标选择',
        auth: true
      },
      component: _import(viewsPrefix + 'form/icon')
    },
    //  酒店示例
    {
      path: 'hotel/dashboard',
      name: 'hotelDashboard',
      meta: {
        title: '工作台',
        auth: true
      },
      component: _import(viewsPrefix + 'hotel/dashboard')
    },
    {
      path: 'hotel/room/list',
      name: 'hotelRoomList',
      meta: {
        title: '房间管理',
        auth: true
      },
      component: _import(viewsPrefix + 'hotel/room/list')
    },
    {
      path: 'hotel/room/checkin',
      name: 'hotelRoomCheckin',
      meta: {
        title: '入住管理',
        auth: true
      },
      component: _import(viewsPrefix + 'hotel/room/checkin')
    },
    {
      path: 'hotel/room/type',
      name: 'hotelRoomtype',
      meta: {
        title: '房间类型管理',
        auth: true
      },
      component: _import(viewsPrefix + 'hotel/room/roomtype')
    }
  ]

}
