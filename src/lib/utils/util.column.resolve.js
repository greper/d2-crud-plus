import _clonedeep from 'lodash.clonedeep'

/**
 * 根据type获取column的默认配置
 * @type
 */
const DefaultComponents = {
  datetime: {
    form: { component: { name: 'el-date-picker', props: { type: 'datetime' } } },
    component: { name: 'date-format' }
  },
  date: {
    form: { component: { name: 'el-date-picker' } },
    component: { name: 'date-format', props: { format: 'YYYY-MM-DD' } }
  },
  daterange: {
    form: {
      component: {
        name: 'el-date-picker',
        props: {
          type: 'daterange',
          'range-separator': '至',
          'start-placeholder': '开始',
          'end-placeholder': '结束'
        }
      }
    },
    formatter: daterangeFormatter
  },
  datetimerange: {
    form: {
      component: {
        name: 'el-date-picker',
        props: {
          type: 'datetimerange',
          'range-separator': '至',
          'start-placeholder': '开始',
          'end-placeholder': '结束'
        }
      }
    },
    formatter: daterangeFormatter
  },
  time: {
    form: { component: { name: 'el-time-picker' } },
    component: { name: 'date-format', props: { format: 'HH:mm:ss' } }
  },
  select: {
    search: { component: { props: { clearable: true } } },
    form: { component: { name: 'dict-select', props: {} } },
    component: { name: 'values-format', props: {} },
    _handle (item) {
      if (item.dict != null) {
        this.form.component.props.dict = item.dict
        this.component.props.dict = item.dict
      }
    }
  },
  cascader: {
    form: { component: { name: 'el-cascader', props: {} } },
    _handle (item) {
    }
  },
  phoneNumber: {
    form: { component: { name: 'el-phone-number-input', props: { size: 'sm', 'only-countries': ['CN', 'HK', 'TW', 'US'] } } },
    formatter (row, column, value, index) {
      let ret = ''
      if (value != null) {
        if (value.callingCode != null) {
          ret += '(+' + value.callingCode + ')'
        } else if (value.countryCode != null) {
          ret += '(' + value.countryCode + ')'
        }
        if (value.phoneNumber != null) {
          ret += value.phoneNumber
        }
      }
      return ret
    }
  }
}

function daterangeFormatter (row, column, value, index) {
  if (value != null && value instanceof Array && value.length > 1) {
    return value[0] + '-' + value[1]
  }
  return value
}

function getByType (type, item) {
  let config = DefaultComponents[type]
  let column = {}
  if (config != null) {
    column = _clonedeep(config)
  }
  if (column._handle != null) {
    column._handle(item)
  }
  delete column._handle
  if (column.form == null) {
    column.form = {}
  }
  if (column.form.component == null) {
    column.form.component = {}
  }
  column.form.component.span = 12
  return column
}

const ColumnResolveUtil = {
  getByType: getByType
}

export default ColumnResolveUtil
