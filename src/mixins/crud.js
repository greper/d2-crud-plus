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
    /**
     * 初始化column配置
     * 将配置解析成columns、addTemplate、editTemplate、searchOptions等
     * 将columns的type 解析成不同的component配置
     * 每个column的add、edit、search共用一个form.component的配置
     */
    initColumns () {
      let crudOptions = this.getCrudOptions()

      Object.assign(this.crud.options, crudOptions.options ? crudOptions.options : {})
      Object.assign(this.crud.formOptions, crudOptions.formOptions ? crudOptions.formOptions : {})
      Object.assign(this.crud.searchOptions, crudOptions.searchOptions ? crudOptions.searchOptions : {})

      this.crud.columns = []
      this.crud.searchOptions.columns = []
      for (let item of crudOptions.columns) {
        let key = item.key
        let defaultColumn = ColumnResolveUtil.getByType(item.type, item)
        console.log('defaultColumn', defaultColumn)
        // 用户配置覆盖默认配置
        let itemCopy = _clonedeep(item)
        Object.assign(item, defaultColumn)
        _merge(item, itemCopy)
        // 统一component的props
        if (item.form.component != null) {
          let props = item.form.component.props
          for (let key in props) {
            item.form.component[key] = props[key]
          }
        }
        let form = item.form
        console.log('form', form)
        if (item.search != null && item.search.disabled !== true) {
          let component = _clonedeep(item.form.component)
          let search = {
            label: item.title,
            key: item.key,
            dict: item.dict,
            component: component
          }
          _merge(search, item.search)
          this.crud.searchOptions.columns.push(search)
        }
        if (form.disabled !== true) {
          if (form.addDisabled !== true) {
            this.crud.addTemplate[key] = {
              title: item.title,
              ...form
            }
            this.crud.addRules[key] = form.rules
          }
          if (form.editDisabled !== true) {
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
      console.log('crud inited:', this.crud)
    },
    /**
     * 动态计算crud表格高度，当表格数据大于一屏的时候不会撑开，给翻页组件留出空间
     * crud表格高度 = 可视窗口高度 - crud表头的top位置 - adjust高度
     * @param ref 表格的ref name
     * @param adjust 自定义调整高度（一般传翻页footer组件的高度）
     * @returns {string}
     */
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
    /**
     * 翻页组件change事件触发方法
     * @param val
     */
    handlePaginationChange (val) {
      this.crud.page = val
      console.log('page changed:', val)
      if (this.$refs.search != null) {
        this.$refs.search.handleFormSubmit()
      }
    },
    /**
     * 查询按钮点击
     * @param form
     */
    handleSearch (form) {
      console.log('do search , 查询参数:', form)
      for (let key in form) {
        if (form[key] === '') {
          delete form[key]
        }
      }
      this.crud.searchForm = form
      this.doValueResolve(form)
      this.doRefresh()
    },
    /**
     * 表格刷新，重新拉取数据
     */
    doRefresh () {
      let form = this.crud.searchForm
      let query = {
        size: this.crud.page.size,
        current: this.crud.page.current,
        ...form
      }
      this.crud.loading = true
      this.pageRequest(query).then(ret => {
        for (const col of this.crud.columns) {
          if (col.valueBuilder) {
            for (const row of ret.data.records) {
              col.valueBuilder(row)
            }
          }
        }
        this.crud.page.current = ret.data.current
        this.crud.page.size = ret.data.size
        this.crud.page.total = ret.data.total
        this.$set(this.crud, 'list', ret.data.records)
      }).finally(() => {
        this.crud.loading = false
      })
    },
    /**
     * 加载数据
     * 页面初始化后触发的方法
     */
    doLoad () {
      this.handleSearch({})
    },
    /**
     * 编辑对话框打开前要做的操作
     * @param mode
     * @param row
     */
    handleDialogOpen ({ mode, row }) {
    },
    /**
     * 点击添加按钮
     */
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
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
      for (const col of this.crud.columns) {
        if (col.valueResolve) {
          col.valueResolve(row)
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
    handleSelectionChange (selection) {
      console.log(selection)
    },
    /**
     * 单条点击选中
     * @param currentRow
     * @param oldCurrentRow
     */
    handleCurrentChange (currentRow, oldCurrentRow) {
      console.log(currentRow)
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
    }

  }
}
