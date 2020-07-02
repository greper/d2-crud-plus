export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit (index, row, templage = null) {
      this.formMode = 'edit'
      this.$emit('dialog-open', {
        mode: 'edit',
        row
      })
      this.editIndex = index
      if (!templage) {
        templage = this.editTemplate
      }
      return this.openDialog(index, row, templage)
    }

  }
}
