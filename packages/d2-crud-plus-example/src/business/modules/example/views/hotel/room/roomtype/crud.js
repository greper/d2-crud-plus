export const crudOptions = {
  searchOptions: { disabled: true },
  columns: [

    {

      title: 'id',
      key: 'id',
      width: '90',
      sortable: true,
      align: 'center',
      search: {
        name: 'id',
        disabled: true
      },

      form: {
        addDisabled: true,
        editDisabled: true,
        rules: [{ required: true, message: '请输入id' }]
      }

    },
    {

      title: '添加时间',
      key: 'createDate',
      sortable: true,
      search: {
        name: 'create_date',
        disabled: true
      },
      align: 'center',
      type: 'datetime',
      width: '160',
      form: {
        addDisabled: true,
        editDisabled: true,
        rules: [{ required: true, message: '请输入添加时间' }]
      }

    },

    {

      title: '更新时间',
      key: 'updateDate',
      columnName: 'update_date',
      sortable: true,
      search: {
        name: 'update_date',
        disabled: true
      },
      align: 'center',
      type: 'datetime',
      width: '160',
      form: {
        addDisabled: true,
        editDisabled: true,
        rules: [{ required: true, message: '请输入更新时间' }]
      }

    },
    {

      title: '类型名称',
      key: 'name',
      sortable: true,
      search: {
        name: 'name',
        disabled: false
      },

      // type: 'select',
      form: {
        rules: [{ required: true, message: '请输入类型名称' }]
      },
      component: {
        name: 'values-format'
      }

    }
  ]
}
