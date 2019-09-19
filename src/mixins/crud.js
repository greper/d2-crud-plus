import HeightUtil from '../utils/util.height'
import _merge from 'lodash.merge'
import _clonedeep from 'lodash.clonedeep'
import ColumnResolveUtil from '../utils/util.column.resolve'

export default {
  components: { },
  data () {
    return {
      crud: {
        formOptions: {
          labelWidth: '100px',
          labelPosition: 'left',
          saveLoading: false,
          gutter: 20
        },
        options: {
          stripe: true,
          border: true,
          highlightCurrentRow: false
        },
        columns: [],
        addTemplate: {},
        editTemplate: {},
        addRules: {},
        editRules: {},
        searchOptions: { disabled: false },
        list: [],
        loading: false,
        page: {
          current: 1,
          size: 20,
          total: 1
        },
        rowHandle: {
          // columnHeader: '操作',
          width: 200,
          edit: {
            icon: 'el-icon-edit',
            text: '编辑',
            size: 'small',
            show (index, row) {
              return true
            },
            disabled (index, row) {
              return false
            }
          },
          remove: {
            icon: 'el-icon-delete',
            text: '删除',
            size: 'small',
            fixed: 'right',
            confirm: true,
            show (index, row) {
              return true
            },
            disabled (index, row) {
              return false
            }
          }
        }
      }
    }
  },
  created () {
    this.initColumns()

    this.doLoad()
  },
  mounted () {
    this.$nextTick(() => {
      this.crud.options.maxHeight = this.computeCrudHeight()
    })
  },
  methods: {
    initColumns () {
      let crudOptions = this.getCrudOptions()

      Object.assign(this.crud.options, crudOptions.options ? crudOptions.options : {})
      Object.assign(this.crud.formOptions, crudOptions.formOptions ? crudOptions.formOptions : {})
      Object.assign(this.crud.searchOptions, crudOptions.searchOptions ? crudOptions.searchOptions : {})

      this.crud.columns = []
      this.crud.searchOptions.columns = []
      for (let item of crudOptions.columns) {
        let key = item.key
        if (item.form == null) {
          item.form = { disabled: true }
        }
        let form = item.form

        let defaultColumn = ColumnResolveUtil.getByType(item.type, item)
        // 用户配置覆盖默认配置
        let itemCopy = _clonedeep(item)
        Object.assign(item, defaultColumn)
        _merge(item, itemCopy)
        if (item.search != null && item.search.disabled !== true) {
          let search = {
            label: item.title,
            key: item.key,
            dict: item.dict,
            component: item.form.component
          }
          _merge(search, item.search)
          this.crud.searchOptions.columns.push(search)
        }
        if (form && form.disabled !== true) {
          if (!form.addDisabled) {
            this.crud.addTemplate[key] = {
              title: item.title,
              ...form
            }
            this.crud.addRules[key] = form.rules
          }
          if (!form.editDisabled) {
            this.crud.editTemplate[key] = {
              title: item.title,
              ...form
            }
            this.crud.editRules[key] = form.rules
          }
        }

        if (!item.disabled) { // 如果该列没有禁用显示
          this.crud.columns.push(item)
        }
      }
    },
    computeCrudHeight (ref, adjust) {
      if (ref == null) {
        ref = 'd2Crud'
      }
      let subclass = 'el-table__header-wrapper'
      if (adjust == null) {
        adjust = 50
      }
      let target = this.$refs[ref]
      if (target != null) {
        target = target.$el
      }
      return HeightUtil.computeMaxHeight(target, adjust, subclass)
    },
    handlePaginationChange (val) {
      this.crud.page = val
      console.log('page changed:', val)
      this.$refs.search.handleFormSubmit()
    },
    handleSearch (form) {
      console.log('do search :', form)
      for (let key in form) {
        if (form[key] === '') {
          delete form[key]
        }
      }
      this.crud.searchForm = form
      this.doRefresh()
    },
    doRefresh () {
      let form = this.crud.searchForm
      let query = {
        size: this.crud.page.size,
        current: this.crud.page.current,
        ...form
      }
      this.crud.loading = true
      this.fetchList(query).then(ret => {
        this.crud.page.current = ret.data.current
        this.crud.page.size = ret.data.size
        this.crud.page.total = ret.data.total
        this.$set(this.crud, 'list', ret.data.records)
      }).finally(() => {
        this.crud.loading = false
      })
    },
    doLoad () {
      this.handleSearch({})
    },
    handleDialogOpen ({ mode, row }) {
    },
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    handleRowAdd (row, done) {
      this.crud.formOptions.saveLoading = true
      this.addRequest(row).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.crud.formOptions.saveLoading = false
        if (this.addAfter != null) this.addAfter(row)
      }).catch(() => {
        this.crud.formOptions.saveLoading = false
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.crud.formOptions.saveLoading = true
      if (this.handleRowEditSaveBefore != null) {
        row = this.handleRowEditSaveBefore(row)
      }
      this.updateRequest(row).then((ret) => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })

        done()
        this.crud.formOptions.saveLoading = false
        if (this.updateAfter != null) this.updateAfter(row)
      }).catch(() => {
        this.crud.formOptions.saveLoading = false
      })
    },
    handleDialogCancel (done) {
      done()
    },
    handleSelectionChange (selection) {
      console.log(selection)
    },
    handleCurrentChange (currentRow, oldCurrentRow) {
      console.log(currentRow)
    },
    handleRowRemove ({ index, row }, done) {
      this.delRequest(row).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
        if (this.delAfter != null) this.delAfter(row)
      })
    },
    addRequest (row) {
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现addRequest' })
      })
    },
    addAfter (row) {
      this.doAfterRowChange(row)
    },
    updateRequest (row) {
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现updateRequest' })
      })
    },
    updateAfter (row) {
      this.doAfterRowChange(row)
    },
    delRequest (row) {
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现delRequest' })
      })
    },
    delAfter (row) {
      this.doAfterRowChange(row)
    },
    fetchList (page) {
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现fetchList' })
      })
    },
    doAfterRowChange (row) {
      this.doRefresh()
    }

  }
}
