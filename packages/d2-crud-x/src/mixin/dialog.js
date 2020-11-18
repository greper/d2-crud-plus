import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'
import _isequal from 'lodash.isequal'

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * @description dialog查看标题
     */
    viewTitle: {
      type: String,
      default: '查看'
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
      isFormShow: false,
      /**
       * @description 表单数据
       */
      formData: {},
      formDataBefore: {},
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
    getFormTitle () {
      if (this.formMode === 'add') {
        return this.addTitle
      } else if (this.formMode === 'edit') {
        return this.editTitle
      } else if (this.formMode === 'view') {
        return this.viewTitle
      } else {
        return this.editTitle
      }
    },
    getFormData () {
      return this.formData
    },
    async buildFormData (index, row, templage) {
      if (templage == null) {
        console.warn('template为空,mode:', this.formMode)
        templage = {}
      }
      const formData = {}
      this.formTemplateStorage = templage ? _clonedeep(templage) : {}
      delete this.formTemplateStorage.__group__
      this.formTemplateGroupStorage = templage.__group__ ? _clonedeep(templage.__group__) : undefined
      const tempGroups = {
        default: { columns: this.formTemplateStorage }
      }
      if (this.formTemplateGroupStorage) {
        _forEach(this.formTemplateGroupStorage.groups, (value, key) => {
          tempGroups[key] = value
        })
      }
      let newRow = await this.fetchDetail(index, row, this.formMode)
      newRow = newRow || {}
      this.formDataStorage = newRow
      const formGroupsActive = []
      _forEach(tempGroups, (group, groupKey) => {
        if (!group.collapsed) {
          formGroupsActive.push(groupKey)
        }
        _forEach(group.columns, (template, key) => {
          let value = this._get(newRow, key)
          // 设置默认值
          if (template && value === undefined) {
            if (template.value != null) {
              value = template.value
            } else if (template.component) {
              if (template.component.value != null) {
                value = template.component.value
              } else if (template.component.props && template.component.props.value != null) {
                value = template.component.props.value
              }
            }
          }
          this._set(formData, key, value)
        })
      })
      this.$set(this, 'formGroupsActive', formGroupsActive)
      this.$set(this, 'formData', formData)
      if (this.formOptions.saveRemind) {
        this.$set(this, 'formDataBefore', _clonedeep(formData))
      }

      return {
        newRow,
        formData,
        formTemplateStorage: this.formTemplateStorage,
        formTemplateGroupStorage: this.formTemplateGroupStorage,
        formDataStorage: this.formDataStorage
      }
    },
    handleDialogShowUpdate (value) {
      if (value) {
        this.isFormShow = true
        this.$nextTick(() => {
          this.isDialogShow = true
        })
      } else {
        this.isDialogShow = false
        this.$nextTick(() => {
          this.isFormShow = false
        })
      }
    },
    async openDialog (index, row, templage) {
      const { newRow, formData } = await this.buildFormData(index, row, templage)

      this.handleDialogShowUpdate(true)

      this.$emit('dialog-opened', {
        mode: this.formMode,
        row: newRow,
        form: formData,
        template: this.formTemplateStorage,
        groupTemplate: this.formTemplateGroupStorage
      })
    },
    fetchDetail (index, row, formMode) {
      if (this.options.fetchDetail != null) {
        const ret = this.options.fetchDetail(index, row, formMode)
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

    buildAddSubmitData () {
      const rowData = {}
      _forEach(this.formData, (value, key) => {
        this._set(rowData, key, value)
      })
      return rowData
    },
    buildEditSubmitData () {
      const rowData = _clonedeep(this.formDataStorage)
      _forEach(this.formData, (value, key) => {
        if (value == null && this.formOptions && this.formOptions.nullToBlankStr) {
          value = ''
        }
        this._set(rowData, key, value)
      })
      return rowData
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
          rowData = this.buildEditSubmitData()
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
          rowData = this.buildAddSubmitData()
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
        } else if (this.formMode === 'view') {
          this.handleDialogSaveDone(rowData)
        }
      })
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel (done) {
      if (this.formOptions.saveRemind) {
        if (!_isequal(this.formData, this.formDataBefore)) {
          // 提醒保存
          let confirm = this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '保存',
            cancelButtonText: '放弃保存',
            type: 'warning'
          })
          if (this.formOptions.saveRemind instanceof Function) {
            confirm = this.formOptions.saveRemind()
          }
          return confirm.then(() => {
            this.handleDialogSave()
          }).catch((action) => {
            if (action === 'cancel') {
              // 放弃保存，并关闭
              this.$emit('dialog-cancel', done)
            } else {
              // 留在当前页面
            }
          })
        }
      }
      this.$emit('dialog-cancel', done)
    },
    /**
     * @description 保存完成
     */
    handleDialogSaveDone (rowData) {
      if (this.formOptions.updateTableDataAfterEdit !== false) {
        if (this.formMode === 'edit') {
          this.handleUpdateRow(this.editIndex, rowData)
        } else if (this.formMode === 'add') {
          this.handleAddRow(rowData)
        }
      }
      this.formDataStorage = {}
      this.handleCloseDialog()
    },
    /**
     * @description 关闭模态框
     */
    handleCloseDialog () {
      this.formDataBefore = null
      this.handleDialogShowUpdate(false)
    }
  }
}
