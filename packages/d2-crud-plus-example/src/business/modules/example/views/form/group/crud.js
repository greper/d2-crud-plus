export const crudOptions = {
  options: {
    height: '100%' // 表格高度100%, 使用toolbar必须设置
  },
  columns: [
    {
      title: '商品标题',
      key: 'title',
      sortable: true
    },
    {
      title: '商品代码',
      key: 'code',
      search: { disabled: false },
      sortable: true
    },
    {
      title: '图片',
      key: 'images',
      sortable: true,
      type: 'image-uploader'
    },
    {
      title: '价格',
      key: 'price',
      sortable: true
    },
    {
      title: '库存',
      key: 'store',
      sortable: true,
      type: 'number'
    },
    {
      title: '简介',
      key: 'intro',
      sortable: true,
      type: 'text-area'
    },
    {
      title: '详情',
      key: 'content',
      sortable: true,
      type: 'editor-ueditor',
      disabled: true
    }
  ],
  formGroup: {
    type: 'collapse', // tab
    accordion: false,
    groups: {
      base: {
        title: '商品基础',
        icon: 'el-icon-goods',
        columns: ['title', 'code', 'images']
      },
      price: {
        title: '库存价格',
        icon: 'el-icon-price-tag',
        columns: ['store', 'price']
      },
      info: {
        title: '详情',
        collapsed: true,
        icon: 'el-icon-warning-outline',
        columns: ['intro', 'content']
      }
    }
  }
}
