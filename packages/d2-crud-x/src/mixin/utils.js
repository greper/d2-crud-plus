export default {
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute (attribute, defaultValue, params) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      if (attribute && attribute instanceof Function) {
        return attribute(params)
      }
      return attribute || defaultValue
    },
    /**
     * 查找字段配置
     * @param key
     * @param groupKey
     * @returns {{}|{}|*}
     */
    getFormTemplate (key, groupKey = undefined) {
      if (groupKey == null) {
        if (key != null) {
          // 未分组的字段
          const column = this.formTemplateStorage[key]
          if (column != null) {
            return column
          }
          if (this.formTemplateGroupStorage && this.formTemplateGroupStorage.groups) {
            for (const groupsKey in this.formTemplateGroupStorage.groups) {
              const group = this.formTemplateGroupStorage.groups[groupsKey]
              if (group && group.columns && group.columns[key]) {
                return group.columns[key]
              }
            }
          }
          console.warn('formTemplate not found:key=', key, 'defaultStorage:', this.formTemplateStorage, 'groupStorage:', this.formTemplateGroupStorage)
          return null
        }
        return this.formTemplateStorage
      }

      return this.getFormTemplateGroup(key, groupKey)
    },
    /**
     * 查找分组下的字段配置
     * @param groupKey 分组key
     * @param key 不传获取分组下的字段列表
     * @returns {{}|*}
     */
    getFormTemplateGroup (groupKey, key) {
      if (!this.formTemplateGroupStorage) {
        console.warn('formTemplateGroup not defined')
        return null
      }
      if (groupKey == null) {
        return this.formTemplateGroupStorage.groups
      }
      const group = this.formTemplateGroupStorage.groups[groupKey]
      if (key != null) {
        // 分组的字段
        if (group && group.columns) {
          if (group.columns[key]) {
            return group.columns[key]
          }
        }
        console.warn('formTemplate not found:group=', groupKey, 'key=', key)
        return null
      }
      if (group) {
        return group.columns
      } else {
        console.warn('formTemplateGroup not found:group=', groupKey)
        return null
      }
    },
    /**
     * @description 根据dialog模式渲染不同表单
     */
    handleFormTemplateMode (key) {
      return this.formTemplateStorage[key]
    },
    /**
     * @description 根据dialog模式渲染不同表单校验规则
     */
    handleFormRulesMode () {
      if (this.formMode === 'edit') {
        return this.editRules
      } else if (this.formMode === 'add') {
        return this.addRules
      }
    },

    getFormComponentProp (key, prop, defaultValue) {
      const template = this.getFormTemplate(key)
      if (template && template.component && template.component.props) {
        return this.handleAttribute(template.component.props[prop], defaultValue)
      }
      return defaultValue
    },

    getFormComponentAttr (key, attr, defaultValue) {
      const template = this.getFormTemplate(key)
      if (template && template.component) {
        return this.handleAttribute(template.component[attr], defaultValue)
      }
      return defaultValue
    },
    getTemplateComponentAttr (template, attr, defaultValue, params) {
      if (template && template.component) {
        return this.handleAttribute(template.component[attr], defaultValue, params)
      }
      return defaultValue
    },
    getAttribute (obj, attr, defaultValue, params) {
      if (obj) {
        return this.handleAttribute(obj[attr], defaultValue, params)
      }
      return defaultValue
    },
    getComponentProp (item, key, prop, defaultValue, params) {
      if (!item) {
        return defaultValue
      }
      const component = item.component
      if (component && component.props) {
        return this.handleAttribute(component.props[prop], defaultValue, params)
      }
      return defaultValue
    },
    getTableImpl (tableType) {
      if (tableType) {
        return tableType
      }
      if (this.options && this.options.tableType) {
        return this.options.tableType
      }
      if (this.tableType) {
        return this.tableType
      }
      return 'el-table'
    },
    getTableColumnImpl (tableType) {
      const table = this.getTableImpl(tableType)
      if (table === 'vxe-table') {
        return 'vxe-table-column'
      } else {
        return 'el-table-column'
      }
    },
    forBindProps (props) {
      if (props instanceof Object) {
        return props
      }
      return undefined
    },
    isVxeTable (tableType) {
      const table = this.getTableImpl(tableType)
      if (table === 'vxe-table') {
        return true
      }
      return false
    },
    getCellScope (scope) {
      if (this.thisIsVxeTable) {
        // vxe-table的index不一样
        scope.index = scope.$rowIndex
      } else {
        scope.index = scope.$index
      }
      return scope
    }
  },
  computed: {
    thisIsVxeTable () {
      return this.isVxeTable()
    }
  }
}
