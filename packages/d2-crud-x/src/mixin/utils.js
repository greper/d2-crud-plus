export default {
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute (attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      if (attribute && attribute instanceof Function) {
        return attribute()
      }
      return attribute || defaultValue
    },
    getFormTemplate (key) {
      if (key != null) {
        return this.formTemplateStorage[key]
      }
      return this.formTemplateStorage
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
      let component = this.getFormTemplate(key).component
      if (component && component.props) {
        return this.handleAttribute(component.props[prop], defaultValue)
      }
      return defaultValue
    },

    getFormComponentAttr (key, attr, defaultValue) {
      let component = this.getFormTemplate(key).component
      if (component) {
        return this.handleAttribute(component[attr], defaultValue)
      }
      return defaultValue
    },
    getComponentProp (item, key, prop, defaultValue) {
      if (!item) {
        return defaultValue
      }
      let component = item.component
      if (component && component.props) {
        return this.handleAttribute(component.props[prop], defaultValue)
      }
      return defaultValue
    }
  }
}
