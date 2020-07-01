import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    rowHandle: {
      edit: {
        disabled: () => {
          return !vm.hasPermissions('permission:platform:edit')
        }
      },
      remove: {
        disabled: () => {
          return !vm.hasPermissions('permission:platform:del')
        }
      },
      custom: [
        {
          text: '添加',
          type: 'primary',
          size: 'small',
          emit: 'add-sub-resource',
          icon: 'el-icon-plus'
        }
      ],
      width: 280,
      fixed: 'right'
    },
    options: {
      highlightCurrentRow: true,
      rowKey: 'id'
    },
    columns: [
      {
        title: '资源名称',
        key: 'title',
        sortable: true,
        width: 200
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '图标',
        key: 'icon',
        sortable: false,
        type: 'icon-selector',
        width: 60
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '资源代码',
        key: 'name',
        sortable: true,
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '权限代码',
        key: 'permission',
        sortable: true,
        width: 170
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由地址',
        key: 'path',
        sortable: true,
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '路由组件',
        key: 'component',
        sortable: true,
        width: 180
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '排序',
        key: 'sort',
        sortable: true
        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      },
      {
        title: '资源类型',
        key: 'type',
        type: 'select',
        align: 'center',
        width: 100,
        dict: {
          url: '/base/dicts/ResourceTypeEnum',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data })
          }
        },
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
        sortable: true
      },
      {
        title: 'id',
        key: 'id',
        // type: 'select',
        // search: { disabled: true }, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, //是否隐藏列
        sortable: true
      },
      {
        title: '父节点',
        key: 'parentId',
        sortable: true,
        width: 90

        // type: 'select',
        // search: { disabled: true }, //开启查询
        // form: { disabled: true } //表单配置
        // disabled: false //是否隐藏列
      }
    ]
  }
}
