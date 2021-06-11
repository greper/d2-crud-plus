export const crudOptions = (vm) => {
  return {
    indexRow: { // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center'
    },
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    viewOptions: {
    },
    columns: [
      {
        title: 'id',
        key: 'id',
        sortable: true,
        width: 100,
        form: { disabled: true }
      },
      {
        title: '标题',
        key: 'title',
        sortable: true,
        width: 400,
        form: { component: { span: 24 } }
      },
      {
        title: '摘要',
        key: 'text',
        sortable: true,
        type: 'text-area',
        viewForm: {
          component: {
            name: null,
            render (h, scope) {
              return <div>{scope.value}</div>
            }
          }
        }
      },
      {
        title: '禁用启用',
        key: 'disable',
        sortable: true,
        search: { disabled: false },
        type: 'dict-switch',
        dict: { data: [{ value: true, label: '禁用' }, { value: false, label: '启用' }] },
        form: {
          component: {
            span: 24
          }
        }
      },
      {
        title: '切换编辑器',
        key: 'change',
        sortable: false,
        type: 'radio',
        disabled: true,
        dict: { data: [{ value: 'quill', label: 'Quill' }, { value: 'ueditor', label: 'UEditor' }, { value: 'wang', label: 'WangEditor' }] }
      },
      {
        title: '内容',
        key: 'content',
        sortable: true,
        width: 300,
        type: 'editor-quill', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              uploader: {
                type: 'form' // 上传后端类型【cos,aliyun,oss,form】
              }
            },
            events: {
              'text-change': (event) => {
                console.log('text-change:', event)
              }
            },
            show (context) {
              return context.form.change === 'quill'
            }
          }
        }
      },
      {
        title: '内容',
        key: 'content_ueditor',
        sortable: true,
        width: 300,
        type: 'editor-ueditor', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              config: {
                serverUrl: '/api/ueditor/'
              }
            },
            show (context) {
              return context.form.change === 'ueditor'
            }
          }
        }
      },
      {
        title: '内容',
        key: 'content_wang',
        sortable: true,
        width: 300,
        type: 'editor-wang', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              config: {
                // withCredentials: false,
                // uploadImgServer: 'http://localhost:7070/api/upload/form/upload'
              }
            },
            show (context) {
              return context.form.change === 'wang'
            }
          }
        }
      },
      {
        title: '内容2',
        key: 'content_wang2',
        sortable: true,
        width: 300,
        type: 'editor-wang', // 富文本图片上传依赖file-uploader，请先配置好file-uploader
        disabled: true, // 设置true可以在行展示中隐藏
        form: {
          component: {
            disabled: () => {
              return vm.getEditForm().disable
            },
            props: {
              index: 2,
              config: {
                // withCredentials: false,
                // uploadImgServer: 'http://localhost:7070/api/upload/form/upload'
              }
            }
          }
        }
      }
    ]
  }
}
