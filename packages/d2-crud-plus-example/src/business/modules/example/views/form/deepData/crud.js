export const crudOptions = (vm) => {
  return {
    format: {
      flatData: { disabled: false } // 启用数据扁平化
    },
    pageOptions: {
      compact: true
    },
    options: {
      height: '100%'
    },
    viewOptions: { // view 配置
      componentType: 'form', // 查看时使用哪种组件展示【form=使用表单组件,row=使用行展示组件】
      disabled: false // 开启view
      // defaultRender:(h,scope)=>{return (<span>{scope.value}</span>)} //没有配置组件的，默认渲染render
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: '用户名',
        key: 'user#name',
        sortable: true
      },
      {
        title: '性别',
        key: 'user.gender',
        sortable: true,
        search: {
          disabled: true
        },
        type: 'select',
        dict: {
          data: [{ value: 0, label: '未知' }, { value: 1, label: '男' }, { value: 2, label: '女' }]
        }
      },
      {
        title: '部门名称',
        key: 'dept.name',
        sortable: true,
        search: { disabled: true }
      },
      {
        title: '部门状态',
        key: 'dept#status',
        sortable: true,
        search: { disabled: true },
        type: 'radio',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: { span: 24 }
        }
      },
      {
        title: '爱好',
        key: 'checkbox',
        sortable: true,
        search: { disabled: true },
        type: 'checkbox',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: { span: 24 }
        }
      }
    ]
  }
}
