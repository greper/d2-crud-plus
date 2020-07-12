
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
