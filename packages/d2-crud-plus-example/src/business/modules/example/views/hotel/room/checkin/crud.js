import dayjs from 'dayjs'
import { mobileValidator } from 'el-phone-number-input'
function toNooning (date) {
  if (date == null) {
    date = new Date()
  }
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
function addDays (date, days) {
  date.setTime(date.getTime() + 3600 * 1000 * 24 * days)
}
export const crudOptions = {
  columns: [
    {

      title: 'id',
      key: 'id',
      sortable: true,
      search: {
        disabled: true
      },
      align: 'center',
      width: '80',
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
        key: 'create_date',
        disabled: true
      },
      align: 'center',
      type: 'datetime',
      width: '160',
      form: {
        addDisabled: true,
        editDisabled: true,
        rules: [{ required: true, message: '请输入创建时间' }]
      }
    },
    {
      title: '手机号',
      key: 'mobileValue',
      sortable: true,
      align: 'center',
      search: {
        disabled: false,
        width: '260px'
      },
      type: 'phoneNumber',
      form: {
        editDisabled: true,
        rules: [{ required: true, message: '请输入手机号' }, { validator: mobileValidator, message: '手机号不正确' }]
      },
      valueBuilder (row) {
        row.mobileValue = { phoneNumber: row.mobile, callingCode: row.telAreaCode }
      },
      valueResolve (row) {
        if (row.mobileValue != null) {
          row.mobile = row.mobileValue.phoneNumber
          row.telAreaCode = row.mobileValue.callingCode
        }
      }
    },
    {
      title: '客户姓名',
      key: 'guestName',
      sortable: true,
      search: {
        disabled: false
      },
      form: {
        rules: [{ required: false, message: '请输入客户姓名' }]
      }
    },
    {
      title: '房间',
      key: 'roomId',
      sortable: true,
      search: {
        disabled: false,
        component: {
          props: {
            clearable: true
          }
        }
      },
      align: 'center',
      type: 'select',
      form: {
        editDisabled: true,
        rules: [{ required: true, message: '请选择房间' }],
        props: {
          filterable: true
        }
      },
      dict: { url: '/hotel/room/options' }
    },
    {
      title: '入住时间',
      key: 'checkInRange',
      sortable: true,
      width: 260,
      type: 'datetimerange',
      search: {
        disabled: true
      },
      align: 'center',
      form: {
        rules: [{ required: true, message: '请输入入住时间' }],
        component: {
          span: 12,
          'time-arrow-control': true,
          'default-time': ['12:00:00', '12:00:00'],
          'picker-options': {
            shortcuts: [
              {
                text: '今天一晚',
                onClick (picker) {
                  const start = new Date()
                  const end = toNooning()
                  addDays(end, 1)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '今天两晚',
                onClick (picker) {
                  const start = new Date()
                  const end = toNooning()
                  addDays(end, 2)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '今天三晚',
                onClick (picker) {
                  const start = new Date()
                  const end = toNooning()
                  addDays(end, 3)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '今天四晚',
                onClick (picker) {
                  const start = new Date()
                  const end = toNooning()
                  addDays(end, 4)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '明天一晚',
                onClick (picker) {
                  const start = toNooning()
                  const end = toNooning()
                  addDays(start, 1)
                  addDays(end, 2)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '明天两晚',
                onClick (picker) {
                  const start = new Date()
                  const end = new Date()
                  addDays(start, 1)
                  addDays(end, 3)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '明天三晚',
                onClick (picker) {
                  const start = new Date()
                  const end = new Date()
                  addDays(start, 1)
                  addDays(end, 3)
                  picker.$emit('pick', [start, end])
                }
              }
            ]
          }
        }
      },
      formatter (row, column, value, index) {
        return dayjs(row.checkInTime).format('YYYY-MM-DD HH:mm') + '至' + dayjs(row.checkOutTime).format('YYYY-MM-DD HH:mm')
      }
    },
    {
      title: '天数',
      key: 'dayCount',
      sortable: true,
      align: 'center',
      search: {
        disabled: true
      },
      form: {
        disabled: true,
        rules: [{ required: true, message: '请输入天数' }]
      }
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
      form: {
        rules: [{ required: false, message: '请输入备注' }]
      }
    }
  ],
  options: {
    selectionRow: true
  }
}
