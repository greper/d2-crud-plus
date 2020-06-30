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
      this.openDialog(index, row, templage)
    },
    openDialog (index, row, templage) {
      const formData = {}
      this.formTemplateStorage = templage ? _clonedeep(templage) : {}
      delete this.formTemplateStorage.__group__
      this.formTemplateGroupStorage = templage.__group__ ? _clonedeep(templage.__group__) : {}

      const tempGroups = {
        'default': { columns: this.formTemplateStorage },
        ...this.formTemplateGroupStorage.groups
      }

      this.fetchDetail(index, row).then(newRow => {
        this.formDataStorage = newRow
        let formGroupsActive = []
        _forEach(tempGroups, (group, groupKey) => {
          formGroupsActive.push(groupKey)
          _forEach(group.columns, (value, key) => {
            formData[key] = newRow.hasOwnProperty(key) ? newRow[key] : undefined
          })
        })
        this.$set(this, 'formGroupsActive', formGroupsActive)
        this.$set(this, 'formData', formData)
        console.log('edit:', this.formTemplateStorage, this.formTemplateGroupStorage, this.formData, this.formDataStorage)
        this.isDialogShow = true
      })
    },
    fetchDetail (index, row) {
      if (this.options.fetchDetail != null) {
        return this.options.fetchDetail(index, row)
      } else {
        return new Promise(resolve => {
          if (row != null) {
            resolve(_clonedeep(row))
            return
          }
          resolve(undefined)
        })
      }
    }
  }
}
