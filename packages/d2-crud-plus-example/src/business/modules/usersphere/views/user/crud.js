import { mobileValidator } from 'el-phone-number-input'
import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 300,
      view: {
        disabled () {
          return !vm.hasPermissions('permission:user:view')
        }
      },
      edit: {
        disabled () {
          return !vm.hasPermissions('usersphere:user:edit')
        }
      },
      remove: {
        disabled () {
          return !vm.hasPermissions('usersphere:user:del')
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
            return !vm.hasPermissions('usersphere:user:del')
          }
        }
      ]
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        width: 70,
        // type: 'select',
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '创建时间',
        key: 'createTime',
        type: 'datetime',
        width: 140,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '修改时间',
        key: 'updateTime',
        type: 'datetime',
        width: 140,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '用户名',
        key: 'username',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        form: {
          editDisabled: true,
          rules: [{ required: true, message: '请输入用户名' }]
        },
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '密码',
        key: 'password',
        // type: 'select',
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        form: {
          // disabled: true,
          component: {
            props: {
              showPassword: true
            }
          },
          helper: '填写则修改密码'
        }, // 表单配置
        disabled: true, // 是否隐藏列
        sortable: true
      },
      {
        title: '昵称',
        key: 'nickname',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '手机号',
        key: 'mobileValue',
        type: 'phoneNumber',
        width: 150,
        form: {
          rules: [{ required: true, message: '请输入手机号' }, { validator: mobileValidator, message: '手机号不正确' }]
        },
        valueBuilder (row) { // 将row里面手机号相关的字段组合成组件需要的value对象
          row.mobileValue = { phoneNumber: row.mobile, callingCode: row.callingCode }
        },
        valueResolve (row) { // 将value解析成row的字段
          if (row.mobileValue != null) {
            row.mobile = row.mobileValue.phoneNumber
            row.callingCode = row.mobileValue.callingCode
          }
        },
        // dict: { url: ''} //数据字典
        search: { disabled: false, width: '260px' }, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '头像',
        key: 'avatar',
        type: 'avatar-uploader',
        width: 100,
        // dict: { url: ''} //数据字典
        // search: { disabled: true}, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '性别',
        key: 'gender',
        type: 'radio',
        width: 70,
        dict: {
          data: [
            { value: 1, label: '男' }, { value: 2, label: '女', color: 'danger' }
          ]
        }, // 数据字典
        // search: { disabled: true}, // 开启查询
        // form: { disabled: true }, // 表单配置
        // disabled: false, // 是否隐藏列
        sortable: true
      },
      {
        title: '邮箱',
        key: 'email',
        // type: 'select',
        // dict: { url: ''} //数据字典
        search: { disabled: false }, // 开启查询
        // disabled: false, // 是否隐藏列
        form: { // 表单配置
          // disabled: true, // 禁用表单编辑
          rules: [{ required: false, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
        },
        sortable: true
      },
      {
        title: '角色',
        key: 'roles',
        type: 'select',
        width: 250,
        dict: {
          url: '/permission/manager/role/list',
          value: 'id',
          label: 'name',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data })
          }
        }, // 数据字典
        search: { disabled: true }, // 开启查询
        // disabled: false, // 是否隐藏列
        form: { // 表单配置
          disabled: true // 禁用表单编辑
        },
        sortable: true
      }
    ]
  }
}
