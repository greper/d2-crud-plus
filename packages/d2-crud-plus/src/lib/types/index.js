import { daterangeFormatter, shortcuts, datetimerangeFormatter } from './functions'
/**
 * 根据type获取column的默认配置
 * @type
 */
export default {
  'slot-all': {
    search: { slot: true },
    form: { slot: true },
    rowSlot: true
  },
  'slot': {
    form: { slot: true },
    rowSlot: true
  },
  'slot-form': {
    form: { slot: true }
  },
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
          'end-placeholder': '结束',
          'picker-options': { shortcuts: shortcuts }
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
          'end-placeholder': '结束',
          'picker-options': { shortcuts: shortcuts }
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
    search: { disabled: true, component: { props: { clearable: true } } },
    form: { component: { name: 'dict-select', props: {} } },
    component: { name: 'values-format', props: {} }
  },
  radio: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true } } },
    form: { component: { name: 'dict-radio', props: {} } },
    component: { name: 'values-format', props: {} }
  },
  checkbox: {
    search: { disabled: true, component: { name: 'dict-select', props: { clearable: true, multiple: true } } },
    form: { component: { name: 'dict-checkbox', props: {} } },
    component: { name: 'values-format', props: {} }
  },
  cascader: {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true } } } },
    component: { name: 'cascade-format', props: { multiple: false } }
  },
  'cascader-multi': {
    form: { component: { name: 'cascade-select', props: { elProps: { filterable: true, props: { multiple: true }, 'collapse-tags': true } } } },
    component: { name: 'cascade-format', props: { multiple: true } }
  },
  phoneNumber: {
    form: { component: { name: 'el-phone-number-input',
      props: {
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
  },
  'number': {
    form: { component: { name: 'el-input-number', props: { } } },
    align: 'center'
  },
  'switch': {
    form: { component: { name: 'el-switch', props: { } } },
    component: { name: 'el-switch', props: { } },
    align: 'center'
  },
  'slider': {
    form: { component: { name: 'el-slider', props: { } } },
    align: 'center'
  },
  'rate': {
    form: { component: { name: 'el-rate', props: { } } },
    align: 'center'
  },
  'color-picker': {
    form: { component: { name: 'el-color-picker', props: { } } },
    align: 'center'
  },
  'transfer': {
    form: { component: { name: 'el-transfer', props: { } } },
    align: 'center'
  },
  'text-area': {
    form: { component: { name: 'text-area', span: 24 } }
  }
}
