import { cloneDeep } from 'lodash'
import DefaultTypes from '../types/index'

function getByType (type, item) {
  let config = DefaultTypes[type]
  let column = {}
  if (config != null) {
    column = cloneDeep(config)
  }
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
      DefaultTypes[key] = newTypes[key]
    }
  }
}

export default ColumnResolveUtil
