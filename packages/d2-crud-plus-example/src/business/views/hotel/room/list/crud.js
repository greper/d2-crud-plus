export const crudOptions = {
  columns: [

    {

      title: 'id',
      key: 'id',
      width: '90',
      sortable: true,
      search: {
        name: 'id',
        disabled: true
      },
      align: 'center',
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
      align: 'center',
      search: {
        disabled: true
      },
      type: 'datetime',
      width: '160',
      form: {
        addDisabled: true,
        editDisabled: true,
        rules: [{ required: true, message: '请输入添加时间' }]
      }
    },
    {
      title: '房间名称',
      key: 'name',
      sortable: true,
      search: {
        name: 'name',
        disabled: false
      },
      // type: 'select',
      form: {
        rules: [{ required: true, message: '请输入房间名称' }]
      },
      component: {
        name: 'values-format'
      }
    },
    {
      title: '房间状态',
      key: 'status',
      sortable: true,
      align: 'center',
      width: '150',
      search: {
        name: 'status',
        disabled: false,
        component: {
          props: {
            clearable: true
          }
        }
      },
      type: 'select',
      form: {
        rules: [{ required: true, message: '请输入房间状态' }]
      },
      dict: {
        data: [
          { value: 0, label: '正常', color: 'primary' },
          { value: 3, label: '故障', color: 'danger' },
          { value: 4, label: '停用', color: 'info' }
        ]
      }
    },
    {
      title: '房间类型',
      key: 'roomType',
      sortable: true,
      align: 'center',
      width: '150',
      search: {
        name: 'room_type',
        disabled: false,
        component: {
          props: {
            clearable: true
          }
        }
      },
      type: 'select',
      form: {
        rules: [{ required: true, message: '请输入房间类型' }]
      },
      dict: { url: '/hotel/roomtype/options' }
    },

    {

      title: '备注',
      key: 'remark',
      columnName: 'remark',
      sortable: true,
      search: {
        name: 'remark',
        disabled: true
      },

      // type: 'select',
      form: {
        rules: [{ required: false, message: '请输入备注' }]
      }

    }
  ]
}
