export const crudOptions = (vm) => {
  return {
    columns: [
      {
        title: '禁用全部',
        key: 'disable',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '禁用' }, { value: false, label: '启用' }] },
        form: {
          component: {
            span: 24
          },
          helper: '点我禁用和启用以下组件'
        }
      },
      {
        title: '选择',
        key: 'status',
        sortable: false,
        search: {},
        type: 'select',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '文本',
        key: 'text',
        sortable: false,
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: 'radio',
        key: 'radio1',
        sortable: false,
        search: { disabled: false },
        type: 'radio',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: 'checkbox',
        key: 'checkbox',
        sortable: false,
        search: { disabled: false },
        type: 'checkbox',
        dict: {
          url: '/dicts/OpenStatusEnum'
        },
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: 'switch',
        key: 'switch',
        sortable: false,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '是' }, { value: false, label: '否' }] },
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '地区选择',
        key: 'pca',
        type: 'area-selector',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '树形选择',
        key: 'pca2',
        type: 'area-tree-selector',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '头像',
        key: 'avatar',
        type: 'avatar-uploader',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '图片',
        key: 'images',
        type: 'image-uploader',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '文件上传',
        key: 'file',
        type: 'file-uploader',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: 'icon选择',
        key: 'icon',
        type: 'icon-selector',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: 'textarea',
        key: 'text2',
        sortable: false,
        search: { disabled: true },
        type: 'text-area',
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            }
          }
        }
      },
      {
        title: '普通禁用',
        key: 'text3',
        sortable: false,
        form: {
          component: {
            disabled: true
          }
        }
      },
      {
        title: '普通禁用动态',
        key: 'disableText3',
        sortable: false,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '禁用' }, { value: false, label: '启用' }] },
        form: {
          component: {
            span: 24
          },
          valueChange (key, value, form) {
            const column = vm.getEditFormTemplate('text3')
            if (column && column.component) {
              column.component.disabled = value
            }
          }
        }
      }

    ]
  }
}
