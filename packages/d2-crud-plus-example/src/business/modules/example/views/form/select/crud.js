export const crudOptions = {
  columns: [
    {
      title: '单选，远程',
      key: 'status',
      sortable: true,
      search: {},
      type: 'select',
      dict: {
        url: '/api/dicts/OpenStatusEnum'
      }
    },
    {
      title: '多选,本地',
      key: 'mselect',
      sortable: true,
      search: {
        disabled: false
      },
      type: 'select',
      form: {
        component: {
          props: {
            filterable: true,
            multiple: true,
            clearable: true
          }
        }
      },
      dict: {
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
      }
    },
    {
      title: '级联',
      key: 'cascader',
      sortable: true,
      search: {
        disabled: false
      },
      type: 'cascader',
      dict: {
        url: '/api/select/cascadeData'
      }
    },
    {
      title: '级联多选',
      key: 'mcascader',
      sortable: true,
      search: {
        disabled: false
      },
      type: 'cascader-multi',
      dict: {
        url: '/api/select/cascadeData'
      }
    },
    {
      title: 'radio',
      key: 'status2',
      sortable: true,
      search: { disabled: false },
      type: 'radio',
      dict: {
        url: '/api/dicts/OpenStatusEnum'
      }
    },
    {
      title: 'checkbox',
      key: 'status3',
      sortable: true,
      search: { disabled: false },
      type: 'checkbox',
      dict: {
        url: '/api/dicts/OpenStatusEnum'
      }
    }
  ]
}
