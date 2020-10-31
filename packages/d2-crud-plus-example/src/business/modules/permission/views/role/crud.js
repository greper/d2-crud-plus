export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('permission:role:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('permission:role:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('permission:role:del')
        }
      },
      custom: [
        {
          thin: true,
          text: null,
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
        sortable: 'custom',
        width: 100,
        // type: 'select',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '创建时间',
        key: 'createTime',
        sortable: 'create_time',
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '更新时间',
        key: 'updateTime',
        sortable: 'update_time',
        type: 'datetime',
        // search: { disabled: true }, //开启查询
        form: { disabled: true } // 表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '角色名称',
        key: 'name',
        sortable: 'name'
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
        sortable: 'custom'
      }

    ]
  }
}
