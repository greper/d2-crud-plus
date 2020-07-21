import HeightUtil from '../utils/util.height'
import { cloneDeep, merge, forEach } from 'lodash'
import ColumnResolveUtil from '../utils/util.column.resolve'
import CommonOptionsUtil from '../utils/util.options.common'
import DictUtil from '../utils/util.dicts'
import TableStore from '../utils/util.store'

export default {
  components: {},
  data () {
    return {
      crud: {
        pageOptions: {
          compact: undefined
        },
        format: {
          ref: {
            d2Crud: 'd2Crud',
            search: 'search',
            footer: 'footer'
          },
          response (ret) {
            return ret.data
          },
          doFormat: function (data, name) {
            if (name instanceof Function) {
              return name(data)
            }
            return data[name]
          },
          page: { // page接口返回的数据结构配置
            request: {
              current: 'current', // 目标页码
              size: 'size' // 每页条数
            },
            response: {
              current: 'current', // 当前页码
              size: 'size', // 每页条数
              total: 'total', // 总记录数
              records: 'records' // 列表数据
            }
          }
        },
        formOptions: {
          labelWidth: '100px',
          labelPosition: 'left',
          saveLoading: false,
          gutter: 20,
          fullscreen: false,
          updateTableDataAfterEdit: false
        },
        options: {
          rowKey: 'id',
          stripe: true,
          border: true,
          highlightCurrentRow: false,
          size: 'mini',
          maxHeightAdjust: undefined //
        },
        columns: [],
        addTemplate: {},
        editTemplate: {},
        addRules: {},
        editRules: {},
        searchOptions: { disabled: false, show: true, form: {} },
        list: [],
        loading: false,
        pagination: {
          pageSize: 20,
          pageSizes: [5, 10, 20, 30, 40, 50, 100],
          layout: 'slot, total, sizes, prev, pager, next, jumper'
        },
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
      },
      multipleSelection: undefined
    }
  },
  created () {
    this.initColumns()
    this.doLoad()
  },
  mounted () {
    this.reComputeCrudHeight()
  },
  computed: {
    _crudProps () {
      const props = {
        editTitle: '修改',
        columns: this.crud.columns,
        data: this.crud.list,
        rowHandle: this.crud.rowHandle,
        addTemplate: this.crud.addTemplate,
        addRules: this.crud.addRules,
        editTemplate: this.crud.editTemplate,
        editRules: this.crud.editRules,
        formOptions: this.crud.formOptions,
        options: this.crud.options,
        loading: this.crud.loading
      }
      if (this.crud.indexRow) {
        props.indexRow = this.crud.indexRow
      }
      if (this.crud.selectionRow) {
        props.selectionRow = this.crud.selectionRow
      }
      if (this.crud.expandRow) {
        props.expandRow = this.crud.expandRow
      }
      if (this.crud.pagination) {
        props.pagination = this.crud.pagination
      }
      return props
    },
    _crudListeners () {
      return {
        'row-edit': this.handleRowEdit,
        'row-add': this.handleRowAdd,
        'row-remove': this.handleRowRemove,
        'form-data-change': this.handleFormDataChange,
        'current-change': this.handleCurrentChange,
        'selection-change': this.handleSelectionChange,
        'pagination-change': this.handlePaginationChange,
        'dialog-open': this.handleDialogOpen,
        'dialog-opened': this.handleDialogOpened,
        'dialog-cancel': this.handleDialogCancel,
        'select-all': this.handleSelectAll
      }
    }
  },
  methods: {
    /**
     * 获取编辑框的formData
     * @returns
     */
    getD2Crud () {
      return this.$refs[this.crud.format.ref.d2Crud]
    },
    /**
     *  获取 el-table实例
     * @returns {*}
     */
    getD2CrudTable () {
      return this.getD2Crud().$refs.elTable
    },
    /**
     * 获取当前列表数据
     * @returns
     */
    getD2CrudTableData () {
      return this.getD2Crud().d2CrudData
    },
    /**
     * 获取编辑框的formData
     * @returns
     */
    getEditForm () {
      return this.getD2Crud().formData
    },
    /**
     * 获取编辑框的组件参数配置
     * @returns
     */
    getEditFormTemplate (key, groupKey = undefined) {
      return this.getD2Crud().getFormTemplate(key, groupKey)
    },
    /**
     * 获取编辑框的分组组件参数配置
     * @returns
     */
    getEditFormTemplateGroup (groupKey, key) {
      return this.getD2Crud().getFormTemplateGroup(groupKey, key)
    },
    /**
     * 初始化column配置
     * 将配置解析成columns、addTemplate、editTemplate、searchOptions等
     * 将columns的type 解析成不同的component配置
     * 每个column的add、edit、search共用一个form.component的配置
     */
    initColumns () {
      let crudOptions = this.getCrudOptions()
      let commonOptions = CommonOptionsUtil.create()
      merge(commonOptions, crudOptions)
      crudOptions = commonOptions
      let columns = crudOptions.columns
      merge(this.crud, crudOptions)
      const crud = this.crud
      crud.columns = []
      crud.searchOptions.columns = []
      crud.columnsMap = {}
      for (let item of columns) {
        this.initColumnItem(crud.columns, item)
      }

      // 配置group
      if (crud.formGroup) {
        const addGroup = crud.addTemplate.__group__ = cloneDeep(crud.formGroup)
        const editGroup = crud.editTemplate.__group__ = cloneDeep(crud.formGroup)
        forEach(crud.formGroup.groups, (group, groupKey) => {
          const addColumns = {}
          addGroup.groups[groupKey].columns = addColumns
          const editColumns = {}
          editGroup.groups[groupKey].columns = editColumns

          forEach(group.columns, (key) => {
            const addTemplate = crud.addTemplate[key]
            if (addTemplate) {
              addColumns[key] = (addTemplate)
              delete crud.addTemplate[key]
            }

            const editTemplate = crud.editTemplate[key]
            if (editTemplate) {
              editColumns[key] = (editTemplate)
              delete crud.editTemplate[key]
            }
          })
        })
      }

      this.getPageSizeFromStorage()
      this.initAfter()
      console.log('crud inited:', crud)
    },
    userConfigCover (userConfig, defaultConfig) {
      let target = cloneDeep(defaultConfig)
      if (userConfig == null) {
        return target
      }
      merge(target, userConfig)
      return target
    },
    initColumnItem (parantColumns, item) {
      if (item.children != null && item.children.length > 0) {
        // 复杂表头
        let children = []
        parantColumns.push({ ...item, children: children })
        for (let subItem of item.children) {
          this.initColumnItem(children, subItem)
        }
        return
      }
      let key = item.key
      let defaultColumn = ColumnResolveUtil.getByType(item.type, item)
      let newItem = cloneDeep(defaultColumn)

      // 用户配置覆盖默认配置
      merge(newItem, item)
      item = newItem
      if (item._handle != null) {
        item._handle(item)
      }
      if (item.form && item.form.component && item.form.component.span == null) {
        item.form.component.span = this.crud.formOptions.defaultSpan ? this.crud.formOptions.defaultSpan : 12
      }
      if (item.dict != null) {
        DictUtil.mergeDefault(item.dict)
        if (item.form && item.form.component && item.form.component.props) {
          if (item.form.component.props.dict == null) {
            item.form.component.props.dict = {}
          }
          item.form.component.props.dict = this.userConfigCover(item.form.component.props.dict, item.dict)
        }
        if (item.component && item.component.props) {
          if (item.component.props.dict == null) {
            item.component.props.dict = {}
          }
          item.component.props.dict = this.userConfigCover(item.component.props.dict, item.dict)
        }
      }

      // 不再统一component的props
      // if (item.form != null && item.form.component != null) {
      //   let props = item.form.component.props
      //   for (let key in props) {
      //     item.form.component[key] = props[key]
      //   }
      // }
      let form = item.form
      if (item.search != null && item.search.disabled !== true) {
        let component = item.form ? cloneDeep(item.form.component) : {}
        let search = {
          title: item.title,
          key: item.key,
          component: component,
          valueChange: form.valueChange
        }
        merge(search, item.search)
        this.crud.searchOptions.columns.push(search)
      }
      if (form.disabled !== true) {
        const template = {
          title: item.title,
          ...form
        }
        delete template.addTemplateHandle
        delete template.editTemplateHandle
        if (form.addDisabled !== true) {
          let addTemplate = this.userConfigCover(item.addForm, template)
          this.crud.addTemplate[key] = addTemplate
          if (form.addTemplateHandle != null) {
            form.addTemplateHandle(addTemplate)
          }
          this.crud.addRules[key] = addTemplate.rules
        }
        if (form.editDisabled !== true) {
          const editTemplate = this.userConfigCover(item.editForm, template)
          this.crud.editTemplate[key] = editTemplate
          if (form.editTemplateHandle != null) {
            form.editTemplateHandle(editTemplate)
          }
          this.crud.editRules[key] = form.rules
        }
      }
      delete item.type
      if (item.columnType) {
        item.type = item.columnType
      }
      if (!item.disabled) { // 如果该列没有禁用显示
        parantColumns.push(item)
      }
      // 放到map里面方便快速查找
      this.crud.columnsMap[key] = item
    },
    /**
     * 初始化结束后调用方法
     */
    initAfter () {

    },
    reComputeCrudHeight () {
      if (this.crud && this.crud.options && this.crud.options.height === '100%') {
        return
      }
      this.$nextTick(() => {
        this.crud.options.maxHeight = this.computeCrudHeight()
      })
    },
    /**
     * 动态计算crud表格高度，当表格数据大于一屏的时候不会撑开，给翻页组件留出空间
     * crud表格高度 = 可视窗口高度 - crud表头的top位置 - adjust高度
     * @param ref 表格的ref name
     * @param adjust 自定义调整高度（一般传翻页footer组件的高度）
     * @returns {string}
     */
    computeCrudHeight ({ targetRef, targetSubClass, footerRef, adjust } = {}) {
      if (targetRef == null) {
        targetRef = 'd2Crud'
      }
      if (footerRef == null) {
        footerRef = 'footer'
      }
      if (targetSubClass == null) {
        targetSubClass = 'el-table'
      }
      let target = this.$refs[targetRef]
      if (target != null) {
        target = target.$el
      }

      let footer = this.$refs[footerRef]
      if (footer != null) {
        footer = footer.$el
      }
      if (adjust == null) {
        adjust = this.crud.options.maxHeightAdjust
      }

      return HeightUtil.computeMaxHeight({ target, targetSubClass, footer, adjust })
    },
    /**
     * 翻页组件change事件触发方法
     * @param val
     */
    handlePaginationChange (val) {
      this.doPaginationMerge(val)
      this.doRefresh()
    },
    doPaginationMerge (page) {
      const current = page.current != null ? page.current : page.currentPage
      const size = page.size != null ? page.size : page.pageSize
      const total = page.total

      if (this.crud.page) {
        this.crud.page.current = current
        this.crud.page.size = size
        this.crud.page.total = total
      }
      if (this.crud.pagination) {
        if (this.crud.pagination.pageSize !== size) {
          this.savePageSizeToStorage(size)
        }
        this.crud.pagination.pageSize = size
        this.crud.pagination.currentPage = current
        this.crud.pagination.total = total
      }
    },
    getPageSizeTableStore () {
      if (this.pageSizeTableStore == null) {
        this.pageSizeTableStore = new TableStore({ $router: this.$route, tableName: 'pageSize', keyType: this.crud.pagination.storage })
      }
      return this.pageSizeTableStore
    },
    savePageSizeToStorage (size) {
      if (this.crud.pagination && this.crud.pagination.storage === false) {
        return
      }
      this.getPageSizeTableStore().updateTableValue(size)
    },
    getPageSizeFromStorage () {
      if (this.crud.pagination && this.crud.pagination.storage === false) {
        return
      }
      const size = this.getPageSizeTableStore().getTableValue()
      if (size != null) {
        this.crud.pagination.pageSize = size
        if (this.crud.page) {
          this.crud.page.size = size
        }
      }
    },
    /**
     * 查询按钮点击
     * @param form
     */
    handleSearch (form) {
      for (let key in form) {
        if (form[key] === '') {
          delete form[key]
        }
      }
      this.doPageTurn(1)
      this.crud.searchOptions.form = form
      this.doValueResolve(form)
      console.log('do search , 查询参数:', form)
      this.doRefresh()
    },
    doPageTurn (no) {
      if (this.crud.page) {
        this.crud.page.current = no // 点击查询后，从第一页开始
      }
      if (this.crud.pagination) {
        this.crud.pagination.pageCurrent = no
      }
    },
    /**
     * 表格刷新，重新拉取数据
     */
    doRefresh () {
      let form = this.crud.searchOptions.form
      let query = {
        ...form
      }
      const requestCurrent = this.crud.pagination.current ? this.crud.pagination.current : this.crud.pagination.currentPage // 兼容旧版本
      const requestPageSize = this.crud.pagination.size ? this.crud.pagination.size : this.crud.pagination.pageSize // 兼容
      query[this.crud.format.page.request.size] = requestPageSize
      query[this.crud.format.page.request.current] = requestCurrent

      this.crud.loading = true
      return this.pageRequest(query).then(ret => {
        const pageFormat = this.crud.format.page.response
        const format = this.crud.format.doFormat
        const data = this.crud.format.response(ret)
        const records = format(data, pageFormat.records)
        const current = format(data, pageFormat.current)
        const size = format(data, pageFormat.size)
        const total = format(data, pageFormat.total)
        for (const key in this.crud.columnsMap) {
          const col = this.crud.columnsMap[key]
          if (col.valueBuilder) {
            for (const row of records) {
              col.valueBuilder(row, col)
            }
          }
        }
        this.doPaginationMerge({ currentPage: current, pageSize: size, total: total })
        this.$set(this.crud, 'list', records)

        if (requestCurrent > 1 && records && records.length === 0) {
          const pageTotal = total % size === 0 ? total / size : total / size + 1
          this.doPageTurn(pageTotal)
          this.doRefresh()
        }
      }).finally(() => {
        this.crud.loading = false
      })
    },
    /**
     * 加载数据
     * 页面初始化后触发的方法
     */
    doLoad () {
      return this.doRefresh()
    },
    /**
     * 获取search组件
     * @returns {*}
     */
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },
    /**
     * 编辑对话框打开前要做的操作
     * @param mode
     * @param row
     */
    handleDialogOpen ({ mode, row }) {

    },
    /**
     * 编辑对话框打开后要做的操作
     * @param mode
     * @param row
     */
    handleDialogOpened ({ mode, form }) {
      console.log('handleDialogOpened:', mode, form)
      for (let key in this.crud.columnsMap) {
        let column = this.crud.columnsMap[key]
        if (column && column.form && column.form.valueChange && column.form.valueChangeImmediate) {
          column.form.valueChange(key, form[key], this.getEditForm(), {
            getColumn: this.getEditFormTemplate,
            mode: this.getD2Crud().formMode,
            immediate: true
          })
        }
      }

      this.doDialogOpened({ mode, form })
    },
    doDialogOpened ({ mode, form }) {

    },
    /**
     * 点击添加按钮
     */
    addRow (addData) {
      this.getD2Crud().showDialog({
        mode: 'add',
        addData: addData
      })
    },
    /**
     * 批量删除
     */
    batchDelete () {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          message: '您还未选择数据',
          type: 'warning'
        })
        return
      }
      let ids = []
      let rowKey = this.crud.options.rowKey
      if (this.isVxeTable()) {
        rowKey = this.crud.options.rowId
      }
      for (let row of this.multipleSelection) {
        ids.push(row[rowKey])
      }
      return this.$confirm('确定要批量删除这' + ids.length + '条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.batchDelRequest(ids).then(() => {
          this.delAfter()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        // console.log('取消删除', err)
      })
    },

    /**
     * 添加form提交
     * @param row
     * @param done
     */
    handleRowAdd (row, done) {
      this.crud.formOptions.saveLoading = true
      if (this.addBefore != null) {
        this.addBefore(row)
      }
      this.addRequest(row).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.crud.formOptions.saveLoading = false
        this.addAfter(row)
      }).catch(() => {
        this.crud.formOptions.saveLoading = false
      })
    },
    /**
     * 修改form提交
     * @param index
     * @param row
     * @param done
     */
    handleRowEdit ({ index, row }, done) {
      this.crud.formOptions.saveLoading = true
      if (this.editBefore != null) {
        this.editBefore(row)
      }
      this.updateRequest(row).then((ret) => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        done()
        this.crud.formOptions.saveLoading = false
        this.updateAfter(row)
      }).catch(() => {
        this.crud.formOptions.saveLoading = false
      })
    },
    editBefore (row) {
      this.doValueResolve(row)
    },
    addBefore (row) {
      this.doValueResolve(row)
    },
    doValueResolve (row) {
      if (row == null) {
        return
      }
      for (const key in this.crud.columnsMap) {
        const col = this.crud.columnsMap[key]
        if (col.valueResolve) {
          col.valueResolve(row, col)
        }
      }
    },
    /**
     * 编辑对话框取消
     * @param done
     */
    handleDialogCancel (done) {
      done()
    },
    /**
     * 多条勾选选中
     * @param selection
     */
    handleSelectionChange (event) {
      let selection = event
      if (this.isVxeTable()) {
        selection = selection.records
      }
      console.log('selection', selection)
      this.multipleSelection = selection
    },
    /**
     * 单条点击选中
     * @param currentRow
     * @param oldCurrentRow
     */
    handleCurrentChange (currentRow, oldCurrentRow) {
      console.log('handleCurrentChange事件', currentRow)
    },
    /**
     * 全选选中
     */
    handleSelectAll (event) {
      console.log('select all:', event)
    },
    /**
     * 删除请求
     * @param index
     * @param row
     * @param done
     */
    handleRowRemove ({ index, row }, done) {
      if (this.delBefore != null) {
        row = this.delBefore(row)
      }
      this.delRequest(row).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
        this.delAfter(row)
      })
    },
    /**
     * 添加http请求
     * @param row
     * @returns {Promise<any>}
     */
    addRequest (row) {
      console.log('addRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现addRequest' })
      })
    },
    /**
     * 添加成功后触发
     * @param row
     */
    addAfter (row) {
      this.doAfterRowChange(row)
    },
    /**
     * 修改http请求
     * @param row
     * @returns {Promise<any>}
     */
    updateRequest (row) {
      console.log('updateRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现updateRequest' })
      })
    },
    /**
     * 修改成功后触发
     * @param row
     */
    updateAfter (row) {
      this.doAfterRowChange(row)
    },
    /**
     * 删除http请求
     * @param row
     * @returns {Promise<any>}
     */
    delRequest (row) {
      console.log('delRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现delRequest' })
      })
    },
    /**
     * 删除成功后触发
     * @param row
     */
    delAfter (row) {
      this.doAfterRowChange(row)
    },
    /**
     * 翻页http请求
     * @param page
     * @returns {Promise<any>}
     */
    pageRequest (page) {
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现pageRequest' })
      })
    },
    /**
     * 行变动之后触发
     * 添加、修改、删除之后触发
     * 默认触发刷新列表
     * @param row
     */
    doAfterRowChange (row) {
      this.doRefresh()
    },
    /**
     * 编辑框表单改变事件
     */
    handleFormDataChange ({ key, value, form, component, getComponent }) {
      let column = this.crud.columnsMap[key]
      console.log('FormDataChanged:', key)
      if (column && column.form && column.form.valueChange) {
        column.form.valueChange(key, value, this.getEditForm(), {
          getColumn: this.getEditFormTemplate,
          mode: this.getD2Crud().formMode,
          component: component,
          getComponent: getComponent
        })
      }
      this.doFormDataChange({ key, value, form, getColumn: this.getEditFormTemplate, mode: this.getD2Crud().formMode, component })
    },
    /**
     * 用户可覆盖的编辑框表单改变事件
     * @param key
     * @param value
     */
    doFormDataChange ({ key, value, form }) {
    },
    /**
     * columns filter 用户配置修改
     * @param columns
     */
    handleColumnsFilterChanged (columns) {
      this.$set(this.crud, 'columns', columns)
      if (!this.isVxeTable()) {
        this.$nextTick(() => {
          this.getD2CrudTable().doLayout()
        })
      }
    },
    /**
     * 搜索表单值change触发
     * @param key
     * @param value
     * @param component
     * @param form
     */
    handleSearchDataChange ({ key, value, component, form }) {
    },
    isVxeTable () {
      if (this.crud.options.tableType === 'vxe-table') {
        return true
      }
      return false
    }

  }
}
