import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

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
      const formData = {}
      this.formTemplateStorage = templage ? _clonedeep(templage) : {}
      this.fetchDetail(index, row).then(newRow => {
        this.formDataStorage = newRow
        _forEach(this.formTemplateStorage, (value, key) => {
          formData[key] = newRow.hasOwnProperty(key) ? newRow[key] : undefined
        })
        this.$set(this, 'formData', formData)
        this.isDialogShow = true
      })
    },
    fetchDetail (index, row) {
      if (this.options.fetchDetail != null) {
        return this.options.fetchDetail(index, row)
      } else {
        return new Promise(resolve => {
          resolve(_clonedeep(row))
        })
      }
    }
  }
}
