import _clonedeep from 'lodash.clonedeep'

function daterangeFormatter (row, column, value, index) {
  if (value != null && value instanceof Array && value.length > 1) {
    return value[0] + '-' + value[1]
  }
  return value
}

/**
 * 根据类型名称获取column的默认配置
 * @type {{date: {component: {name: string, props: {format: string}}, form: {component: {name: string}}}, datetime: {component: {name: string}, form: {component: {name: string, type: string}}}, daterange: {formatter: daterangeFormatter, form: {component: {"range-separator": string, "start-placeholder": string, name: string, type: string, "end-placeholder": string}}}, select: {component: {name: string, props: {}}, form: {component: {name: string, props: {}}}, _handle(*): void}, datetimerange: {formatter: daterangeFormatter, form: {component: {"range-separator": string, "start-placeholder": string, name: string, type: string, "end-placeholder": string}}}, time: {component: {name: string, props: {format: string}}, form: {component: {name: string}}}}}
 */
const DefaultComponents = {
  datetime: {
    form: { component: { name: 'el-date-picker', type: 'datetime' } },
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
        type: 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始',
        'end-placeholder': '结束'
      }
    },
    formatter: daterangeFormatter
  },
  datetimerange: {
    form: {
      component: {
        name: 'el-date-picker',
        type: 'datetimerange',
        'range-separator': '至',
        'start-placeholder': '开始',
        'end-placeholder': '结束'
      }
    },
    formatter: daterangeFormatter
  },
  time: {
    form: { component: { name: 'el-time-picker' } },
    component: { name: 'date-format', props: { format: 'HH:mm:ss' } }
  },
  select: {
    form: { component: { name: 'dict-select', props: {} } },
    component: { name: 'values-format', props: {} },
    _handle (item) {
      if (item.dict != null) {
        this.form.component.props.dict = item.dict
        this.component.props.dict = item.dict
      }
    }
  }
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
