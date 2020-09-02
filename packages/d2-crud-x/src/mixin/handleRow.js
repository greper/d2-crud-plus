export default {
  props: {
    /**
     * @description 操作列
     */
    rowHandle: {
      type: [Boolean, Object],
      default: null
    }
  },
  computed: {
    _handleBtns () {
      const btns = []
      if (this.rowHandle.view) {
        btns.push({
          disabled: false,
          doClick: (scope) => {
            scope = this.getCellScope(scope)
            this.handleView(scope.index, scope.row)
          },
          order: 1,
          text: '查看',
          ...this.rowHandle.view
        })
      }
      if (this.rowHandle.edit) {
        btns.push({
          type: 'primary',
          disabled: false,
          doClick: (scope) => {
            scope = this.getCellScope(scope)
            this.handleEdit(scope.index, scope.row)
          },
          text: '编辑',
          order: 2,
          ...this.rowHandle.edit
        })
      }
      if (this.rowHandle.remove) {
        btns.push({
          type: 'danger',
          disabled: false,
          doClick: (scope) => {
            scope = this.getCellScope(scope)
            this.handleRemove(scope.index, scope.row)
          },
          text: '删除',
          order: 3,
          ...this.rowHandle.remove
        })
      }
      if (this.rowHandle.custom && this.rowHandle.custom.length > 0) {
        for (const item of this.rowHandle.custom) {
          btns.push({
            doClick: (scope) => {
              scope = this.getCellScope(scope)
              this.$emit(item.emit, scope)
            },
            order: 4,
            ...item
          })
        }
      }
      btns.sort((a, b) => { return a.order - b.order })
      return btns
    }

  },
  methods: {
    /**
     * @description 控制操作列 show 的方法
     */
    handleRowHandleButtonShow (show = true, scope) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        scope = this.getCellScope(scope)
        return show(scope.index, scope.row)
      }
      return Boolean(show)
    },
    /**
     * @description 控制操作列 disabled 的方法
     */
    handleRowHandleButtonDisabled (disabled = false, scope) {
      if (typeof disabled === 'boolean') {
        return disabled
      } else if (typeof disabled === 'function') {
        scope = this.getCellScope(scope)
        return disabled(scope.index, scope.row)
      }
      return Boolean(disabled)
    },
    forBindPropsRowHandle (rowHandle) {
      const props = this.forBindProps(rowHandle)
      if (!props) {
        return props
      }
      if (this.thisIsVxeTable) {
        props.title = this.handleAttribute(rowHandle.columnHeader, '操作')
      } else {
        props.label = this.handleAttribute(rowHandle.columnHeader, '操作')
      }
      return props
    }
  }
}
