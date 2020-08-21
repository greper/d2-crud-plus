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
          doClick: (index, row) => {
            this.handleView(index, row)
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
          doClick: (index, row) => {
            this.handleEdit(index, row)
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
          doClick: (index, row) => {
            this.handleRemove(index, row)
          },
          text: '删除',
          order: 3,
          ...this.rowHandle.remove
        })
      }
      if (this.rowHandle.custom && this.rowHandle.custom.length > 0) {
        for (const item of this.rowHandle.custom) {
          btns.push({
            doClick: (index, row) => {
              this.$emit(item.emit, { index: index, row: row })
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
    handleRowHandleButtonShow (show = true, index, row) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        return show(index, row)
      }
      return Boolean(show)
    },
    /**
     * @description 控制操作列 disabled 的方法
     */
    handleRowHandleButtonDisabled (disabled = false, index, row) {
      if (typeof disabled === 'boolean') {
        return disabled
      } else if (typeof disabled === 'function') {
        return disabled(index, row)
      }
      return Boolean(disabled)
    },
    forBindPropsRowHandle (rowHandle) {
      const props = this.forBindProps(rowHandle)
      if (!props) {
        return props
      }
      if (this.isVxeTable()) {
        props.title = this.handleAttribute(rowHandle.columnHeader, '操作')
      } else {
        props.label = this.handleAttribute(rowHandle.columnHeader, '操作')
      }
      return props
    }
  }
}
