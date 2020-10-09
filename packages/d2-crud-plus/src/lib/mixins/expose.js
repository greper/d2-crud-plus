import DictUtil from '../utils/util.dicts'
/**
 * 暴露的方法
 */
export default {
  methods: {

    // --------------页面初始化方法，可以被覆盖--------------
    /**
     * 页面初始化，在created中被调用
     * 必要时可以覆盖为空方法，将this._doStart()在mounted中调用，用于改变初始化的时机
     * @private
     */
    _OnCreated () {
      this._doStart()
    },

    /**
     *  // 如果需要重复init，需要做一些清理工作
     * @private
     */
    initBefore () {
      this.crud.addRules = {}
      this.crud.addTemplate = {}
      this.crud.editRules = {}
      this.crud.editTemplate = {}
      this.crud.viewTemplate = {}
    },
    /**
     * initColumns 初始化结束后调用方法
     */
    initAfter () {},

    /**
     * 第一次请求页面数据
     * initColumns初始化完成后调用
     * 可以用一个空方法覆盖它，阻止初始化后请求数据
     */
    doLoad () {
      return this.doRefresh({ from: 'load' })
    },

    // --------------以下方法，可以被调用，请注意不要覆盖--------------
    /**
     * 获取D2CrudX的实例
     * 之后可以调用它暴露的方法
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
      const d2Crud = this.getD2Crud()
      return d2Crud == null || d2Crud.d2CrudData
    },

    /**
     * 获取编辑框的formData
     * @returns
     */
    getEditForm () {
      return this.getD2Crud().formData
    },
    /**
     * 获取编辑框的模式[view,edit,add]
     * @returns
     */
    getEditFormMode () {
      return this.getD2Crud().formMode
    },
    /**
     * 获取编辑框的组件参数配置
     * 可以进行动态修改
     * groupKey可不传
     * @returns
     */
    getEditFormTemplate (key, groupKey) {
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
     * 获取字典数据,可以传入列的key获取列中配置的dict
     * @param dict  [Object:dict配置 | string:列的key]
     * @param options Object {returnType: 'data'} 返回类型 可选值[data,dataMap]
     * @returns {Promise<T>}  异步返回promise
     */
    getDictData (dict, options) {
      if (typeof dict === 'string') {
        // 获取某个字段中配置的dict的data
        dict = this.crud.columnsMap[dict].dict
      }
      // 根据dict 获取字典数据
      DictUtil.mergeDefault(dict)
      return DictUtil.get(dict, options)
    },

    /**
     * 翻页
     * no=页码
     */
    // this.doPageTurn (no){}

    /**
     * 刷新页面
     */
    // this.doRefresh (){}

    /**
     * 主动查询
     * form = 查询参数
     */
    doSearch (form) {
      this.handleSearch(form)
    },

    /**
     * 获取search组件ref
     * @returns {*}
     */
    getSearch () {
      return this.$refs[this.crud.format.ref.search]
    },

    /**
     * 获取search form 数据
     */
    // this.getSearch().getForm()

    // --------------以下是crud暴露的方法，可以修改列表中的数据等--------------
    /**
     * 外部暴露的更新单元格数据方法
     */
    // this.getD2Crud().updateCell(rowIndex, key, value)

    /**
     * 外部暴露的新增行方法
     */
    // this.getD2Crud().addRow(row)

    /**
     * 外部暴露的编辑行方法
     */
    // this.getD2Crud().handleUpdateRow(index, row)

    /**
     * 外部暴露的删除行方法
     */
    // this.getD2Crud().removeRow(index)

    /**
     * 外部暴露的打开模态框方法
     */
    // this.getD2Crud().showDialog({
    //   mode=[add,edit,view], //当前打开模式
    //   rowIndex = 0, //编辑或查看时，哪一行的数据
    //   template = null, //表单模版
    //   addData = null //添加时的默认数据
    // })

    /**
     * 外部暴露的关闭模态框方法
     */
    // this.getD2Crud().closeDialog()

    // --------------以下方法，可以被覆盖重写--------------

    /**
     * doRefresh结束后的操作
     */
    doAfterRefresh (query, options) {},

    /**
     * 对话框打开前被调用
     * 此方法内无法执行 getEditFormTemplate，请写到doDialogOpened
     * @param context
     * @private
     */
    doDialogOpen (context) {},

    /***
     * 对话框打开后被调用（注意：此时组件还没有被mounted）
     * 可以设置一些默认值，或者做一些动态修改的工作
     * @param context :{
          mode: this.formMode,
          row: newRow,
          form: formData,
          template: this.formTemplateStorage,
          groupTemplate: this.formTemplateGroupStorage
      }
     */
    doDialogOpened (context) {},

    /**
     * 编辑对话框取消
     * @param done
     */
    doDialogCancel (done) {
      done() // 必须调用，否则无法关闭对话框
    },

    /**
     * 多选change事件
     * @param selection
     */
    doSelectionChange (selection) {},

    /**
     * 单选change事件
     */
    doCurrentChange (currentRow, oldCurrentRow) {},

    /**
     * 全选change事件
     * @param event
     */
    doSelectAll (event) {},

    /**
     * 添加数据提交前可以进行修改
     * @param row
     */
    addBefore (row) {},

    /**
     * 添加成功提示
     * @param row
     */
    showAddMessage ({ row }) {
      this.$message({ message: '保存成功', type: 'success' })
    },

    /**
     * 添加成功后触发
     * @param row
     */
    addAfter (row) {
      this.doAfterRowChange(row)
    },

    /**
     * 修改数据提交前可以进行修改
     * @param row
     */
    editBefore (row) {},

    /**
     * 显示修改成功的提示
     * @param index
     * @param row
     */
    showEditMessage ({ index, row }) {
      this.$message({ message: '保存成功', type: 'success' })
    },

    /**
     * 修改成功后触发
     * @param row
     */
    editAfter (row) {
      this.doAfterRowChange(row)
    },

    /**
     * 修改前可以改变传入数据
     * @param row
     */
    delBefore (row) {},

    /**
     * 显示删除成功提示
     */
    showRemoveMessage ({ index, row }) {
      this.$message({ message: '删除成功', type: 'success' })
    },

    /**
     * 删除成功后触发
     * @param row
     */
    delAfter (row) {
      this.doAfterRowChange(row)
    },

    /**
     * 行变动之后触发
     * 添加、修改、删除之后触发
     * 默认触发刷新列表
     * @param row
     */
    doAfterRowChange (row) {
      this.doRefresh({ from: 'afterRowChange' })
    },

    /**
     * 用户可覆盖的cell value 改变事件
     * @param context
     */
    doCellDataChange (context) {},
    /**
     * 用户可覆盖的编辑框表单改变事件
     * @param key
     * @param value
     */
    doFormDataChange ({ key, value, form }) {},

    /**
     * 搜索框内组件value变化事件
     * @param key
     * @param value
     * @param component
     * @param form
     */
    doSearchDataChange ({ key, value, component, form }) {},

    /**
     * 列设置修改后调用
     * @param columns
     */
    doColumnsFilterChanged (columns) {},

    /**
     * 服务端导出数据
     * @param context={
          search: this.crud.searchOptions.form,
          columns: this.crud.columns,
          data: this.crud.list
     * }
     */
    doServerExport (context) {
      this.$message('请覆盖“doServerExport (context) ”方法，window.open打开后端导出url')
    },

    /**
     * 本地导出列参数格式化
     * @param context
     * @param columns
     * @returns {*}
     */
    doExportHeaderFormat (context, columns) {
      const columnBuilder = this.crud.pageOptions.export.columnBuilder
      return columns.map((col) => {
        const colConfig = {
          label: col.title,
          prop: col.key
        }
        if (columnBuilder) {
          columnBuilder(colConfig, context)
        }
        return colConfig
      })
    },
    /**
     *  本地导出 数据格式化
     * @param context
     * @param list
     * @returns {*}
     */
    doExportDataFormat (context, list) {
      const formatter = this.crud.pageOptions.export.formatter
      return list.map((row) => {
        if (formatter) {
          formatter(row, context)
        }
        return row
      })
    }
  }
}
