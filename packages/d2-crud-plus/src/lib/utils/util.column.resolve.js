import { cloneDeep } from 'lodash'
import DefaultTypes from '../types/index'

function getByType (type, item) {
  const config = DefaultTypes[type]
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
  return column
}

function getTypes () {
  return DefaultTypes
}

function getType (key) {
  return DefaultTypes[key]
}
const ColumnResolveUtil = {
  getByType: getByType,
  getType: getType,
  addTypes (newTypes) {
    for (const key in newTypes) {
      DefaultTypes[key] = newTypes[key]
    }
  },
  getTypes: getTypes
}

export default ColumnResolveUtil
