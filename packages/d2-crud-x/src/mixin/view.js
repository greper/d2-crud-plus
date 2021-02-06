export default {
  props: {
    /**
     * @description 查看表单模板
     */
    viewTemplate: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * @description 展示行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     * @param templage
     */
    handleView (index, row, templage = null, modeContext) {
      this.formMode = 'view'
      this.$emit('dialog-open', {
        mode: 'view',
        row
      })
      this.editIndex = index
      if (!templage) {
        templage = this.viewTemplate
      }
      return this.openDialog(index, row, templage, modeContext)
    }

  }
}
