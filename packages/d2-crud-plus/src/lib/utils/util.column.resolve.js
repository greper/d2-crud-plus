import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import StringUtils from './util.string'
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
    formatter: datetimerangeFormatter
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
    form: { component: { name: 'cascade-select', props: {} } },
    component: { name: 'cascade-format', props: {} },
    _handle (item) {
      this.form.component.props.dict = item.dict
      this.component.props.dict = item.dict
    }
  },
  phoneNumber: {
    form: { component: { name: 'el-phone-number-input',
      props: {
        // 'only-countries': ['CN', 'HK', 'TW', 'US'],
        size: 'sm'
      }
    } },
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
  console.log('daterangeFormatter:', value)
  return dateFormatter(value, 'YYYY-MM-DD')
}
function datetimerangeFormatter (row, column, value, index) {
  console.log('datetimerangeFormatter:', value)
  return dateFormatter(value, 'YYYY-MM-DD HH:mm:ss')
}

function dateFormatter (value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (value != null && value instanceof Array && value.length > 1) {
    if (StringUtils.hasEmpty(value)) {
      return undefined
    }
    return doFormat(value[0], format) + '至' + doFormat(value[1], format)
  }
  return doFormat(value, format)
}

function doFormat (date, format) {
  if (StringUtils.isEmpty(date)) {
    return undefined
  }
  return dayjs(date).format(format)
}

function getByType (type, item) {
  let config = DefaultComponents[type]
  let column = {}
  if (config != null) {
    column = cloneDeep(config)
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
  getByType: getByType,
  addTypes (newTypes) {
    for (const key in newTypes) {
      DefaultComponents[key] = newTypes[key]
    }
  }
}

export default ColumnResolveUtil
