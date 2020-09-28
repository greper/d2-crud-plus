export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    pageOptions: {
      export: {
        title: '导出示例表格名称',
        formatter (row, context) { // 格式化数据
          if (row.status != null) {
            // 这里从数据字典获取label，具体来源请看index.vue created方法
            row.status = vm.openStatusDataMap[row.status].label
          }
          if (row.switch != null) {
            row.switch = row.switch ? '是' : '否'
          }
        },
        columnBuilder (col, context) {
          col.width = 20 // 设置列宽度
          if (col.prop === 'avatar1') {
            col.width = 50
          }
        }
      }
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
        title: '创建时间',
        key: 'createDate',
        sortable: true,
        search: {},
        type: 'datetime',
        minWidth: 200
      },
      {
        title: '姓名',
        key: 'name',
        sortable: true,
        search: {}
      },
      {
        title: '单选远程',
        key: 'status',
        sortable: true,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        minWidth: 200
      },
      {
        title: '头像',
        key: 'avatar1',
        type: 'avatar-uploader',
        width: 120,
        component: {
          props: {
            error: false
          }
        }
      },
      {
        title: '图标选择',
        key: 'iconSelect',
        sortable: true,
        type: 'icon-selector'
      },
      {
        title: '开关组件',
        key: 'switch',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '开启' }, { value: false, label: '关闭' }] },
        form: {
          valueChange (key, value, form) {
            console.log('您选中了：', value)
          }
        },
        minWidth: 200
      }
    ]
  }
}
