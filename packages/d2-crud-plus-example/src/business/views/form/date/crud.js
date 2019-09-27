import dayjs from 'dayjs'
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

const shortcuts = [
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

export const crudOptions = {
  columns: [
    {
      title: '时间戳',
      key: 'timestamp',
      sortable: true,
      type: 'datetime',
      search: { width: 185 }
    },
    {
      title: '日期时间',
      key: 'datetime',
      sortable: true,
      type: 'datetime'
    },
    {
      title: '日期',
      key: 'date',
      sortable: true,
      type: 'date'
    },
    {
      title: '时间',
      key: 'time',
      sortable: true,
      type: 'time'
    },
    {
      title: '日期范围',
      key: 'daterange',
      sortable: true,
      type: 'daterange',
      form: {
        component: {
          'time-arrow-control': false,
          'picker-options': { shortcuts: shortcuts }
        }
      },
      formatter (row, column, value, index) {
        return dayjs(row['daterangeStart']).format('YYYY-MM-DD') + '至' + dayjs(row['daterangeEnd']).format('YYYY-MM-DD')
      }
    },
    {
      title: '日期时间范围',
      key: 'datetimerange',
      sortable: true,
      type: 'datetimerange',
      width: 260,
      form: {
        component: {
          'time-arrow-control': true,
          'default-time': ['12:00:00', '12:00:00'],
          'picker-options': { shortcuts: shortcuts }
        }
      },
      formatter (row, column, value, index) {
        return dayjs(row['datetimerangeStart']).format('YYYY-MM-DD HH:mm') + '至' + dayjs(row['datetimerangeEnd']).format('YYYY-MM-DD HH:mm')
      }
    }
  ]
}
