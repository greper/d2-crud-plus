export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd (templage = null, addData) {
      this.formMode = 'add'
      this.$emit('dialog-open', {
        mode: 'add'
      })
      if (!templage) {
        templage = this.addTemplate
      }

      return this.openDialog(undefined, addData, templage)

      // const formData = {}
      // this.formTemplateStorage = templage ? _clonedeep(templage) : {}
      // _forEach(this.formTemplateStorage, (value, key) => {
      //   formData[key] = this.formTemplateStorage[key].value
      // })
      // this.$set(this, 'formData', formData)
      // this.isDialogShow = true
    }
  }
}
