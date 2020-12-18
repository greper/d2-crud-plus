import HeightUtil from '../utils/util.height'
import lodash, { cloneDeep, forEach, get, merge, mergeWith, set } from 'lodash'
import ColumnResolveUtil from '../utils/util.column.resolve'
import CommonOptionsUtil from '../utils/util.options.common'
import DictUtil from '../utils/util.dicts'
import TableStore from '../utils/util.store'
import expose from './expose'
import log from '../utils/util.log'
export default {
  components: {},
  mixins: [expose],
  data () {
    return {
      crud: {
        pageOptions: {
          compact: undefined
        },
        format: {
          // 基本可以废弃
          flatData: { // 是否支持数据扁平化，将数据中的嵌套object拍平
            disabled: true, // 默认禁用
            symbol: '#', // key分隔符
            deleteOnUnFlat: true// 是否在反扁平化后清理扁平痕迹
          },
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
              size: 'size', // 每页条数
              // 需要开启服务端排序： options.sortByServerSide:true
              orderProp: 'orderProp', // 排序字段
              orderAsc: 'orderAsc' // 是否正序
            },
            response: {
              current: 'current', // 当前页码
              size: 'size', // 每页条数
              total: 'total', // 总记录数
              records: 'records' // 列表数据
            }
          }
        },
        viewOptions: {
          disabled: true,
          componentType: 'form',
          defaultRender: (h, scope) => {
            return (scope.value != null && scope.value !== '' ? <el-tag>{scope.value}</el-tag> : undefined)
          }
        },
        formOptions: {
          type: 'dialog', // drawer 或者抽屉
          labelWidth: '100px',
          labelPosition: 'left',
          saveLoading: false,
          gutter: 20,
          fullscreen: false,
          saveRemind: true,
          updateTableDataAfterEdit: false // 是否在更新和添加数据后直接更新表格数据，默认false，因为提交到服务端后，将会自动刷新数据
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
        searchOptions: { disabled: false, show: true, form: {}, size: 'small', columns: [], searchAfterReset: true },
        list: [],
        loading: false,
        pagination: {
          pageSize: 20,
          pageSizes: [5, 10, 20, 30, 40, 50],
          layout: 'slot, total, sizes, prev, pager, next, jumper',
          background: true,
          currentPage: 1,
          total: 1
        },
        page: {
          current: 1,
          size: 20,
          total: 1
        },
        rowHandle: {
          // columnHeader: '操作',
          width: 200,
          view: {
            icon: 'el-icon-view',
            text: '查看',
            size: 'small',
            disabled: false,
            show: true
          },
          edit: {
            icon: 'el-icon-edit',
            text: '编辑',
            size: 'small',
            show: true,
            disabled: false
          },
          remove: {
            icon: 'el-icon-delete',
            text: '删除',
            size: 'small',
            confirm: true,
            show: true,
            disabled: false
          },
          lineEdit: {
            icon: 'el-icon-edit',
            text: '编辑',
            size: 'small',
            show: false,
            disabled: false
          },
          lineEditSave: {
            icon: 'el-icon-check',
            text: '保存',
            size: 'small',
            show: true,
            disabled: false
          },
          lineEditCancel: {
            icon: 'el-icon-close',
            text: '取消',
            size: 'small',
            show: true,
            disabled: false
          }
        }
      },
      multipleSelection: undefined
    }
  },
  created () {
    this._OnCreated()
  },
  mounted () {
    this.reComputeCrudHeight()
  },
  computed: {
    _crudProps () {
      const props = {
        columns: this.crud.columns,
        data: this.crud.list,
        rowHandle: this.crud.rowHandle,
        viewTemplate: this.crud.viewTemplate,
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
        'line-edit': this.handleLineEdit,
        'line-add': this.handleLineAdd,
        'row-edit': this.handleRowEdit,
        'row-add': this.handleRowAdd,
        'row-remove': this.handleRowRemove,
        'form-data-change': this.handleFormDataChange,
        'cell-data-change': this.handleCellDataChange,
        'current-change': this.handleCurrentChange,
        'selection-change': this.handleSelectionChange,
        'pagination-change': this.handlePaginationChange,
        'dialog-open': this.handleDialogOpen,
        'dialog-opened': this.handleDialogOpened,
        'dialog-cancel': this.handleDialogCancel,
        'select-all': this.handleSelectAll,
        'sort-change': this.handleSortChange
      }
    },
    _crudToolbarProps () {
      const props = {
        search: this.crud.searchOptions.show,
        compact: this.crud.pageOptions.compact,
        columns: this.crud.columns,
        export: this.crud.pageOptions.export,
        loading: this.crud.loading
      }
      return props
    },
    _crudToolbarListeners () {
      return {
        export: this.handleExport,
        refresh: this.doRefresh,
        'columns-filter-changed': this.handleColumnsFilterChanged,
        'update:search': (value) => { this.crud.searchOptions.show = value },
        'update:compact': (value) => { this.crud.pageOptions.compact = value }
      }
    }
  },
  methods: {
    /**
     * crud 初始化，被_onCreated调用
     * @private
     */
    _doStart () {
      this.initColumns()
      this.doLoad()
    },

    /**
     * 初始化column配置
     * 将配置解析成columns、addTemplate、editTemplate、searchOptions等
     * 将columns的type 解析成不同的component配置
     * 每个column的add、edit、search共用一个form.component的配置
     */
    initColumns () {
      this.initBefore()
      let crudOptions = this.getCrudOptions()
      const commonOptions = CommonOptionsUtil.create()
      mergeWith(commonOptions, crudOptions, (objValue, srcValue, key, object, source, stack) => {
        if (lodash.isArray(srcValue)) {
          return srcValue
        }
      })
      crudOptions = commonOptions
      const columns = crudOptions.columns
      mergeWith(this.crud, crudOptions, (objValue, srcValue, key, object, source, stack) => {
        if (lodash.isArray(srcValue)) {
          return srcValue
        }
      })
      const crud = this.crud
      crud.columns = []
      crud.searchOptions.columns = []
      crud.columnsMap = {}
      if (columns == null) {
        console.warn('crudOptions.columns不能为空')
      }
      for (const item of columns) {
        this.initColumnItem(crud.columns, item)
      }
      if (crud.rowHandle && crud.viewOptions && crud.viewOptions.disabled && crud.rowHandle.view) {
        crud.rowHandle.view.show = false
      }

      // 表单字段排序
      this._sortFormColumns('add')
      this._sortFormColumns('edit')
      this._sortFormColumns('view')

      // 查询字段排序
      this._sortSearchColumns()

      // 配置group
      this.initColumnsGroup('add', crud)
      this.initColumnsGroup('edit', crud)
      this.initColumnsGroup('view', crud)

      this.getPageSizeFromStorage()

      if (this.crud.pageOptions && this.crud.pageOptions.onInitAfter) {
        this.crud.pageOptions.onInitAfter()
      }
      if (this.crud.formOptions && this.crud.formOptions.type === 'drawer') {
        // 抽屉模式禁用draggable和全屏
        this.crud.formOptions.draggable = false
        this.crud.formOptions.fullscreen = null
      }
      this.initAfter()
      log.info('crud inited:', crud)
    },
    initColumnsGroup (mode, crud) {
      const templateKey = mode + 'Template'
      if (crud.formGroup && crud[templateKey]) {
        const Group = crud[templateKey].__group__ = cloneDeep(crud.formGroup)
        forEach(crud.formGroup.groups, (group, groupKey) => {
          const groupColumns = {}
          Group.groups[groupKey].columns = groupColumns

          forEach(group.columns, (key) => {
            const columnTemplate = crud[templateKey][key]
            if (columnTemplate) { // 将字段挪到分组里面去
              groupColumns[key] = columnTemplate
              delete crud[templateKey][key]
            }
          })
        })
      }
    },
    userConfigCover (userConfig, defaultConfig) {
      const target = cloneDeep(defaultConfig)
      if (userConfig == null) {
        return target
      }
      merge(target, userConfig)
      return target
    },
    _sortFormColumns (mode) {
      const template = this.crud[mode + 'Template']
      if (template == null) {
        return
      }
      const columns = []
      forEach(template, (item, key) => {
        item.key = key
        if (item.order === undefined) {
          item.order = 10
        }
        columns.push(item)
      })
      columns.sort((a, b) => { return a.order - b.order })

      const newTemplate = {}
      for (const column of columns) {
        newTemplate[column.key] = column
      }
      this.crud[mode + 'Template'] = newTemplate
    },
    _sortSearchColumns () {
      if (!this.crud.searchOptions || !this.crud.searchOptions.columns || this.crud.searchOptions.columns.length === 0) {
        return
      }
      const columns = this.crud.searchOptions.columns
      columns.forEach(item => {
        if (item.order === undefined) {
          item.order = 10
        }
      })
      columns.sort((a, b) => { return a.order - b.order })
    },
    initColumnItem (parantColumns, item) {
      if (item.children != null && item.children.length > 0) {
        // 复杂表头
        const children = []
        parantColumns.push({ ...item, children: children })
        for (const subItem of item.children) {
          this.initColumnItem(children, subItem)
        }
        return
      }
      const key = item.key
      const defaultColumn = ColumnResolveUtil.getByType(item.type, item)
      const newItem = cloneDeep(defaultColumn)

      // 用户配置覆盖默认配置
      merge(newItem, item)
      item = newItem
      if (item._handle != null) {
        item._handle(item)
      }
      if (item.form && item.form.component && item.form.component.span == null) {
        item.form.component.span = this.crud.formOptions.defaultSpan ? this.crud.formOptions.defaultSpan : 12
      }

      if (this.initColumnBefore) {
        this.initColumnBefore(item)
      }

      // 字典配置
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

      // search配置
      const form = item.form
      if (item.search != null && item.search.disabled !== true) {
        const component = item.form ? cloneDeep(item.form.component) : {}
        const search = {
          title: item.title,
          key: item.key,
          component: component,
          valueChange: form.valueChange
        }
        merge(search, item.search)
        this.crud.searchOptions.columns.push(search)
      }

      // add 和 edit配置
      if (form.disabled !== true) {
        const template = {
          title: item.title,
          key: item.key,
          ...form
        }
        delete template.addTemplateHandle
        delete template.editTemplateHandle
        if (form.addDisabled !== true) {
          const addTemplate = this.userConfigCover(item.addForm, template)
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
          this.crud.editRules[key] = editTemplate.rules
        }
      }

      // viewTemplate
      if (!(item.view && item.view.disabled === true)) {
        const isFormComponent = this.crud.viewOptions && this.crud.viewOptions.componentType === 'form'
        let view = null
        if (isFormComponent) {
          // 如果是使用form的展示方式，复制form的配置
          view = {
            title: item.title,
            key: item.key,
            ...cloneDeep(form)
          }
        } else {
          const component = cloneDeep(item.component ? item.component : {})
          view = {
            title: item.title,
            key: item.key,
            component: component,
            slot: false
          }
          if (!component.name && !component.render && !item.formatter) {
            component.render = this.crud.viewOptions.defaultRender
          }
          if (!component.span) {
            component.span = this.crud.formOptions.defaultSpan
          }
        }

        merge(view, item.view)
        // 禁用，然后添加到viewTemplateList
        view.component.disabled = true
        if (!this.crud.viewTemplate) {
          this.crud.viewTemplate = {}
        }
        this.crud.viewTemplate[item.key] = view
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
    reComputeCrudHeight () {
      if (this.crud && this.crud.options && (this.crud.options.height === '100%' || this.crud.options.height === 'auto')) {
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
      this.doRefresh({ from: 'pagination' })
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
        this.pageSizeTableStore = new TableStore({
          $router: this.$route,
          tableName: 'pageSize',
          keyType: (this.crud.pagination == null ? undefined : this.crud.pagination.storage)
        })
      }
      return this.pageSizeTableStore
    },
    savePageSizeToStorage (size) {
      if (this.crud.pagination || this.crud.pagination.storage === false) {
        return
      }
      this.getPageSizeTableStore().updateTableValue(size)
    },
    getPageSizeFromStorage () {
      if (this.crud.pagination || this.crud.pagination.storage === false) {
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
    handleSearch (form = {}) {
      for (const key in form) {
        if (form[key] === '') {
          delete form[key]
        }
      }
      this.doPageTurn(1)
      this.crud.searchOptions.form = form
      this.doValueResolve(form)
      log.debug('do search , 查询参数:', form)
      this.doRefresh({ from: 'search' })
    },
    doPageTurn (no) {
      if (this.crud.page) {
        this.crud.page.current = no // 点击查询后，从第一页开始
      }
      if (this.crud.pagination) {
        this.crud.pagination.currentPage = no
      }
    },
    /**
     * 表格刷新，重新拉取数据
     */
    doRefresh (options) {
      const form = this.crud.searchOptions.form
      const query = {
        ...form
      }
      const requestCurrent = this.crud.pagination.current ? this.crud.pagination.current : this.crud.pagination.currentPage
      const requestPageSize = this.crud.pagination.size ? this.crud.pagination.size : this.crud.pagination.pageSize // 兼容
      const requestFormat = this.crud.format.page.request

      function queryFormat (key, value, requestFormat, query) {
        if (requestFormat[key] instanceof Function) {
          requestFormat[key](query, value)
        } else {
          query[requestFormat[key]] = value
        }
      }
      queryFormat('size', requestPageSize, requestFormat, query)
      queryFormat('current', requestCurrent, requestFormat, query)

      const defaultSort = this.crud.options.defaultSort
      if (defaultSort && this.crud.options.order == null) {
        this.crud.options.order = { prop: defaultSort.prop, asc: defaultSort.order === 'ascending' }
      }
      if (this.crud.options.order) {
        const order = this.crud.options.order
        queryFormat('orderProp', order.prop, requestFormat, query)
        queryFormat('orderAsc', order.asc, requestFormat, query)
      }

      this.crud.loading = true
      const promise = this.pageRequest(query, options)
      if (!promise || !promise.then) {
        console.warn('pageRequest需要返回一个Promise,当前返回值 :', promise)
        return
      }
      return promise.then(ret => {
        if (!ret) {
          console.warn('pageRequest请求结果异常,res:', ret)
        }
        const pageFormat = this.crud.format.page.response
        const format = this.crud.format.doFormat
        const data = this.crud.format.response(ret)
        if (data == null) {
          console.warn('获取返回结果不正确，请参考: "http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/quickstart.html#_4-修改http响应拦截的返回结果"')
        }
        let records = format(data, pageFormat.records)
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

        if (records == null || current == null || size == null || total == null) {
          console.warn('请确保format配置或response的格式正确,response:', ret, ',format:', pageFormat)
          console.warn('你可以在此处打个断点调试一下,请参考："http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/structure.html#自定义数据结构"')
        }

        this.doPaginationMerge({ currentPage: current, pageSize: size, total: total })

        // 拍平数据
        records = this._flatData(records)

        this.$set(this.crud, 'list', records)

        if (requestCurrent > 1 && records && records.length === 0) {
          const pageTotal = total % size === 0 ? total / size : total / size + 1
          this.doPageTurn(pageTotal)
          this.doRefresh(options)
        }
      }).finally(() => {
        this.crud.loading = false
        this.doAfterRefresh(query, options)
      })
    },
    /**
     * 拍平数据
     * @param records
     * @private
     */
    _flatData (records) {
      if (!records || !this.crud.format || !this.crud.format.flatData || this.crud.format.flatData.disabled === true) {
        return records
      }
      for (const row of records) {
        const symbol = get(this.crud, 'format.flatData.symbol', '#')
        forEach(this.crud.columnsMap, (item, key) => {
          if (key.indexOf(symbol) !== -1) {
            row[key] = get(row, key.replace(symbol, '.'))
          }
        })
      }
      log.debug('flat data complete:', records)
      return records
    },
    _unFlatData (row) {
      if (!row || !this.crud.format || !this.crud.format.flatData || this.crud.format.flatData.disabled === true) {
        return row
      }
      const symbol = get(this.crud, 'format.flatData.symbol', '#')
      const deleteOnUnFlat = get(this.crud, 'format.flatData.deleteOnUnFlat', true)
      forEach(this.crud.columnsMap, (item, key) => {
        if (key.indexOf(symbol) !== -1) {
          row[key] = set(row, key.replace(symbol, '.'), row[key])
          if (deleteOnUnFlat) {
            delete row[key]
          }
        }
      })
      log.debug('unFlat row complete:', row)
      return row
    },

    /**
     * 编辑对话框打开前要做的操作
     * @param mode
     * @param row
     */
    handleDialogOpen (context) {
      this.doDialogOpen(context)
    },
    /**
     * 编辑对话框打开后要做的操作
     */
    handleDialogOpened (context) {
      const { mode, form } = context
      log.debug('handleDialogOpened:', mode, form)
      for (const key in this.crud.columnsMap) {
        const column = this.crud.columnsMap[key]
        if (column && column.form && column.form.valueChange && column.form.valueChangeImmediate) {
          column.form.valueChange(key, form[key], this.getEditForm(), {
            getColumn: this.getEditFormTemplate,
            mode: this.getD2Crud().formMode,
            immediate: true
          })
        }
      }

      this.doDialogOpened(context)
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
    lineEditAdd (addData) {
      this.getD2Crud().lineEditAdd({
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
      const ids = []
      let rowKey = this.crud.options.rowKey
      if (this.isVxeTable()) {
        rowKey = this.crud.options.rowId
      }
      for (const row of this.multipleSelection) {
        ids.push(row[rowKey])
      }
      return this.$confirm('确定要批量删除这' + ids.length + '条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const promise = this.batchDelRequest(ids)
        if (promise == null || !(promise instanceof Promise)) {
          return
        }
        return promise.then(() => {
          this.delAfter()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        // log.debug('取消删除', err)
      })
    },

    /**
     * 添加form提交
     * @param row
     * @param done
     */
    handleRowAdd (row, done) {
      this.crud.formOptions.saveLoading = true
      row = this._unFlatData(row)
      this.doValueResolve(row)
      this.addBefore(row)
      const promise = this.addRequest(row)
      if (promise == null || !(promise instanceof Promise)) {
        return
      }
      return promise.then(() => {
        this.showAddMessage({ row })
        done()
        return this.addAfter(row)
      }).finally(() => {
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
      row = this._unFlatData(row)
      this.doValueResolve(row)
      this.editBefore(row)
      const promise = this.updateRequest(row)
      if (promise == null || !(promise instanceof Promise)) {
        return
      }
      return promise.then((ret) => {
        this.showEditMessage({ index, row })
        done()
        return this.editAfter(row)
      }).finally(() => {
        this.crud.formOptions.saveLoading = false
      })
    },

    /**
     * 行编辑添加提交
     * @param row
     * @param done
     */
    handleLineAdd ({ index, row }, done) {
      // loading true
      row = this._unFlatData(row)
      this.doValueResolve(row)
      this.addBefore(row)
      const promise = this.addRequest(row)
      if (promise == null || !(promise instanceof Promise)) {
        return
      }
      return promise.then((ret) => {
        this.showAddMessage({ row })
        done(ret)
      }).finally(() => {
        // loading false
      })
    },
    /**
     * 行编辑提交
     * @param index
     * @param row
     * @param done
     */
    handleLineEdit ({ index, row }, done) {
      // this.crud.formOptions.saveLoading = true
      row = this._unFlatData(row)
      this.doValueResolve(row)
      this.editBefore(row)
      const promise = this.updateRequest(row)
      if (promise == null || !(promise instanceof Promise)) {
        return
      }
      return promise.then((ret) => {
        this.showEditMessage({ index, row })
        done(ret)
      }).finally(() => {
        // this.crud.formOptions.saveLoading = false
      })
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
     * 多条勾选选中
     * @param selection
     */
    handleSelectionChange (event) {
      let selection = event
      if (this.isVxeTable()) {
        selection = selection.records
      }
      this.multipleSelection = selection
      this.doSelectionChange(selection)
    },
    /**
     * 单条点击选中
     * @param currentRow
     * @param oldCurrentRow
     */
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.doCurrentChange(currentRow, oldCurrentRow)
    },
    /**
     * 全选选中
     */
    handleSelectAll (event) {
      this.doSelectAll(event)
    },
    /**
     * 编辑对话框取消
     * @param done
     */
    handleDialogCancel (done) {
      this.doDialogCancel(done)
    },
    /**
     * 删除请求
     * @param index
     * @param row
     * @param done
     */
    handleRowRemove ({ index, row }, done) {
      this.delBefore(row)
      return this.delRequest(row).then(() => {
        this.showRemoveMessage({ index, row })
        done()
        return this.delAfter(row)
      })
    },
    /**
     * 添加http请求
     * @param row
     * @returns {Promise<any>}
     */
    addRequest (row) {
      log.debug('addRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现addRequest' })
      })
    },
    /**
     * 修改http请求
     * @param row
     * @returns {Promise<any>}
     */
    updateRequest (row) {
      log.debug('updateRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现updateRequest' })
      })
    },
    /**
     * 删除http请求
     * @param row
     * @returns {Promise<any>}
     */
    delRequest (row) {
      log.debug('delRequest:', row)
      return new Promise((resolve) => {
        resolve({ code: 1, msg: '请实现delRequest' })
      })
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
    handleCellDataChange (context) {
      this.doCellDataChange(context)
    },
    /**
     * 编辑框表单改变事件
     */
    handleFormDataChange ({ key, value, form, component, getComponent }) {
      const column = this.crud.columnsMap[key]
      log.debug('FormDataChanged:', key)
      if (column && column.form && column.form.valueChange) {
        column.form.valueChange(key, value, this.getEditForm(), {
          getColumn: this.getEditFormTemplate,
          mode: this.getD2Crud().formMode,
          component: component,
          getComponent: getComponent
        })
      }
      this.doFormDataChange({
        key,
        value,
        form,
        getColumn: this.getEditFormTemplate,
        mode: this.getD2Crud().formMode,
        component
      })
    },
    /**
     * 列配置修改
     * @param columns
     */
    handleColumnsFilterChanged (columns) {
      this.$set(this.crud, 'columns', columns)
      if (!this.isVxeTable()) {
        this.$nextTick(() => {
          this.getD2CrudTable().doLayout()
        })
      }
      this.doColumnsFilterChanged(columns)
    },
    /**
     * 搜索表单值change触发
     * @param context{ key,value, component,form}
     */
    handleSearchDataChange (context) {
      this.doSearchDataChange(context)
    },
    handleSortChange (context) {
      const { prop, order } = context
      log.debug('sort change:', prop, order)
      const column = this.crud.columnsMap[prop]
      if (column && typeof column.sortable === 'string') {
        if (order == null) {
          this.crud.options.order = null
        } else {
          this.crud.options.order = {
            prop: column.sortable === 'custom' ? prop : column.sortable,
            type: order,
            asc: (order === 'ascending')
          }
        }
        this.doRefresh({ from: 'sort' })
      }
    },
    /**
     * 当前是否是vxeTable
     * @returns {boolean}
     */
    isVxeTable () {
      return this.crud.options.tableType === 'vxe-table'
    },

    handleExport () {
      if (!this.crud.pageOptions.export) {
        log.debug('您还未开启export功能：', "请配置'pageOptions.export:{}'")
        return
      }

      const tips = this.crud.pageOptions.export.tips ? this.crud.pageOptions.export.tips : '确定要导出数据吗？'
      return this.$confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.doExport({
          search: this.crud.searchOptions.form,
          columns: this.crud.columns,
          data: this.crud.list
        })
      }).catch((error) => {
        log.error('export:', error)
      })
    },
    doExport (context) {
      if (!this.crud.pageOptions.export.local) {
        // 服务端导出
        log.debug('export server', context)
        this.doServerExport(context)
      } else {
        log.debug('export local', context)
        this.doLocalExport(context)
      }
    },
    doLocalExport (context) {
      const columns = this.doExportHeaderFormat(context, this.crud.columns)
      const exportOptions = this.crud.pageOptions.export
      let list = cloneDeep(this.crud.list)
      list = this.doExportDataFormat(context, list)
      const options = {
        columns: columns,
        data: list,
        ...exportOptions
      }
      if (!options.merges) {
        options.merges = []
      }
      log.debug('export options：', options)
      const type = exportOptions.type ? exportOptions.type : 'excel'
      this.$export[type](options)
        .then(() => {
          this.$message('导出成功')
        })
    }

  }
}
