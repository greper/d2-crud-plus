import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd (templage = null) {
      this.formMode = 'add'
      this.$emit('dialog-open', {
        mode: 'add'
      })
      if (!templage) {
        templage = this.addTemplate
      }
      const formData = {}
      this.addTemplateStorage = templage ? _clonedeep(templage) : {}

      _forEach(this.addTemplateStorage, (value, key) => {
        formData[key] = this.addTemplateStorage[key].value
      })
      this.$set(this, 'formData', formData)
      this.isDialogShow = true
    }
  }
}
