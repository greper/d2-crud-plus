import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOptions: {
      type: Object,
      default: null
    },
    /**
     * @description dialog新增标题
     */
    addTitle: {
      type: String,
      default: '添加'
    },
    /**
     * @description dialog修改标题
     */
    editTitle: {
      type: String,
      default: '编辑'
    },
    /**
     * @description 新增表单模板
     */
    addTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 修改表单模板
     */
    editTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 新增表单校验规则
     */
    addRules: {
      type: Object,
      default: null
    },
    /**
     * @description 编辑表单校验规则
     */
    editRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /**
       * @description dialog显示与隐藏
       */
      isDialogShow: false,
      /**
       * @description 表单数据
       */
      formData: {},
      /**
       * @description 表单模式
       */
      formMode: 'edit',
      /**
       * @description 暂存数据，用于储存不在editTemplate中的数据
       */
      formDataStorage: {},
      /**
       * @description 表单模板暂存
       */
      formTemplateStorage: {},
      formTemplateGroupStorage: {},
      formGroupsActive: []
    }
  },
  computed: {
  },
  methods: {

    openDialog (index, row, templage) {
      const formData = {}
      this.formTemplateStorage = templage ? _clonedeep(templage) : {}
      delete this.formTemplateStorage.__group__
      this.formTemplateGroupStorage = templage.__group__ ? _clonedeep(templage.__group__) : undefined

      const tempGroups = {
        'default': { columns: this.formTemplateStorage }
      }
      if (this.formTemplateGroupStorage) {
        _forEach(this.formTemplateGroupStorage.groups, (value, key) => {
          tempGroups[key] = value
        })
      }
      return this.fetchDetail(index, row).then(newRow => {
        this.formDataStorage = newRow
        let formGroupsActive = []
        _forEach(tempGroups, (group, groupKey) => {
          if (!group.collapsed) {
            formGroupsActive.push(groupKey)
          }
          _forEach(group.columns, (template, key) => {
            formData[key] = newRow.hasOwnProperty(key) ? newRow[key] : template.value
          })
        })
        this.$set(this, 'formGroupsActive', formGroupsActive)
        this.$set(this, 'formData', formData)
        this.isDialogShow = true

        this.$emit('dialog-opened', {
          mode: this.formMode,
          form: formData,
          template: this.formTemplateStorage,
          groupTemplate: this.formTemplateGroupStorage
        })
      })
    },
    fetchDetail (index, row) {
      if (this.options.fetchDetail != null) {
        const ret = this.options.fetchDetail(index, row)
        if (ret instanceof Promise) {
          return ret
        } else {
          return new Promise(resolve => {
            resolve(ret)
          })
        }
      } else {
        return new Promise(resolve => {
          if (row != null) {
            resolve(_clonedeep(row))
            return
          }
          resolve(undefined)
        })
      }
    },

    /**
     * @description 保存行数据
     */
    handleDialogSave () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        let rowData = {}
        if (this.formMode === 'edit') {
          rowData = _clonedeep(this.formDataStorage)
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-edit', {
            index: this.editIndex,
            row: rowData
          }, (param = null) => {
            if (param === false) {
              this.handleCloseDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        } else if (this.formMode === 'add') {
          _forEach(this.formData, (value, key) => {
            this._set(rowData, key, value)
          })
          this.$emit('row-add', rowData, (param = null) => {
            if (param === false) {
              this.handleCloseDialog()
              return
            }
            this.handleDialogSaveDone({
              ...rowData,
              ...param
            })
          })
        }
      })
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel (done) {
      this.$emit('dialog-cancel', done)
    },
    /**
     * @description 保存完成
     */
    handleDialogSaveDone (rowData) {
      if (this.formMode === 'edit') {
        this.handleUpdateRow(this.editIndex, rowData)
        this.formDataStorage = {}
      } else if (this.formMode === 'add') {
        this.handleAddRow(rowData)
      }
      this.handleCloseDialog()
    },
    /**
     * @description 关闭模态框
     */
    handleCloseDialog () {
      this.isDialogShow = false
    }
  }
}
