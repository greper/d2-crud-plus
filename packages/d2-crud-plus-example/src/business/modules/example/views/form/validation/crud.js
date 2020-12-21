
export const crudOptions = (vm) => {
  const validatePass1 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (vm.getEditForm().password2 !== '') {
        vm.getD2Crud().$refs.form.validateField('checkPass')
      }
      callback()
    }
  }
  const validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== vm.getEditForm().password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  return {
    options: {
      height: '100%'
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
        title: '姓名',
        key: 'name',
        sortable: true,
        headerAlign: 'center',
        align: 'left',
        form: {
          helper: '添加和编辑时必填，编辑时额外需要校验长度',
          // 由于数组配置合并时是取并集，不同的部分需要分开配置
          rules: [{ required: true, message: '请输入姓名' }],
          component: {
            name: 'el-input',
            maxlength: 5, // 原生属性要写在这里
            props: {
              type: 'text',
              showWordLimit: true
            }
          }
        },
        editForm: { // 由于数组配置合并时是取并集，所以需要分开配置
          rules: [{ min: 2, max: 5, message: '姓名长度为2-5' }]
        }
      },
      {
        title: '年龄',
        key: 'age',
        align: 'left',
        form: {
          // 由于数组配置合并时是取并集，不同的部分需要分开配置
          rules: [{ pattern: /\d+/, message: '必须为整数' }],
          helper: '正则表达式'
        }
      },
      {
        title: '密码',
        key: 'password',
        sortable: true,
        disabled: true,
        form: {
          rules: [{ required: true, message: '请输入密码' }, { validator: validatePass1, trigger: 'blur' }]
        }
      },
      {
        title: '确认密码',
        key: 'password2',
        sortable: true,
        disabled: true,
        form: {
          rules: [{ required: true, message: '请输入确认密码' }, { validator: validatePass2, trigger: 'blur' }]
        }
      },
      {
        title: '必选',
        key: 'status',
        sortable: true,
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          rules: [{ required: true, message: '请选择一个选项' }]
        }
      },
      {
        title: '邮箱',
        key: 'email',
        sortable: true,
        form: {
          rules: [{ type: 'email', message: '请填写正确的邮箱' }]
        }
      },
      {
        title: 'URL',
        key: 'url',
        sortable: true,
        form: {
          rules: [{ type: 'url', message: '请填写正确的url' }]
        }
      }

    ]
  }
}
