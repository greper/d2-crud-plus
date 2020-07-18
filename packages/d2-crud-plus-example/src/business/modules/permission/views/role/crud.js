export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 300,
      edit: {
        disabled () {
          return !vm.hasPermissions('permission:role:edit')
        }
      },
      remove: {
        disabled () {
          return !vm.hasPermissions('permission:role:del')
        }
      },
      custom: [
        {
          text: ' 授权',
          type: 'warning',
          size: 'small',
          emit: 'authz',
          icon: 'el-icon-s-flag',
          disabled () {
            return !vm.hasPermissions('permission:role:authz')
          }
        }
      ]
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        sortable: true,
        width: 100,
        // type: 'select',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '创建时间',
        key: 'createTime',
        sortable: true,
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '更新时间',
        key: 'updateTime',
        sortable: true,
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '角色名称',
        key: 'name',
        sortable: true
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '角色代码',
        key: 'code',
        // type: 'select',
        search: { disabled: false }, // 开启查询
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          }
        }, // 表单配置
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: '父角色id',
        key: 'parentId',
        sortable: true
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '所属平台',
        key: 'platformId',
        type: 'select',
        search: { disabled: true }, // 开启查询
        dict: { url: '/permission/manager/platform/list', value: 'id', label: 'name' },
        form: {
          editTemplateHandle (form) {
            form.component.disabled = true // 编辑时禁用控件，不允许编辑
          },
          valueChange (key, value) {
            console.log('-----你选择了', value, vm.crud.columnsMap.platformId.component.props.dict.dataMap[value].name)
          }
        }, // 表单配置
        // disabled: false //是否隐藏列
        sortable: true
      }

    ]
  }
}
