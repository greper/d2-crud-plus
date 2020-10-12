<template>
  <div class="d2p-tree-selector">
    <div  class="el-cascader el-cascader--default" :class="{'is-disabled':disabled}" @click="openDialog">
      <div class="el-input el-input--default el-input--suffix" :class="{'is-disabled':disabled}" >
        <el-input ref="reference" :disabled="disabled" />
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner"><i class="el-input__icon el-icon-arrow-down" @click="openDialog"/>
        </span>
        </span>
      </div>
      <div class="el-cascader__tags" ref="tags">
        <transition-group @after-leave="resetInputHeight" >
          <el-tag
            v-for="item in selected"
            :key="getValueKey(item)"
            :closable="false"
            :size="collapseTagSize"
            :hit="false"
            type="info"
            disable-transitions>
            <span class="el-select__tags-text">{{ getValueLabel(item) }}</span>
          </el-tag>
        </transition-group>
      </div>
    </div>
    <el-dialog
      title="选择"
      :visible.sync="dialogVisible"
      width="30%" append-to-body>
      <div>
        <el-tree
          :data="data"
          @check-change="handleCheckChange"
          @current-change="handleCurrentChange"
          v-bind="_elProps"
          ref="elTree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="selectSubmit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import lodash from 'lodash'
import { d2CrudPlus } from '../../utils/d2-crud-plus'
// 树形选择组件，需要import {D2pTreeSelector} from 'd2p-extends'
export default {
  name: 'd2p-tree-selector',
  mixins: [d2CrudPlus.inputBase],
  props: {
    // 值
    value: {
      type: [Number, String, Boolean, Array, Object]
    },
    // 过滤，value中的nodes过滤方法 参数为nodes
    filter: {
      type: Function,
      require: false
    },
    // 是否多选，传入false为单选
    multiple: {
      type: Boolean,
      default: true
    },
    // 是否忽略选中节点的子节点
    ignoreFullCheckedChildren: { type: Boolean, default: true },
    // 是否只返回叶子节点
    leafOnly: { type: Boolean, default: false },
    // 是否包含半选节点
    includeHalfChecked: { type: Boolean, default: false },
    // el-tree的属性配置
    elProps: {
      type: Object
    },
    // 数据字典配置
    dict: {
      type: Object,
      require: false
    }
  },
  data () {
    return {
      collapseTags: false,
      data: [],
      selected: [],
      dialogVisible: false
    }
  },
  created () {
    // if (this.dict) {
    //   this.dict = d2CrudPlus.util.dict.mergeDefault(this.dict, true)
    // }
    this.initData()
  },
  computed: {
    _elProps () {
      const defaultElProps = {
        showCheckbox: this.multiple,
        highlightCurrent: !this.multiple,
        props: {}
      }
      if (this.dict != null) {
        if (this.dict.label != null) { defaultElProps.props.label = this.dict.label }
        if (this.dict.value != null) { defaultElProps.props.value = this.dict.value }
        if (this.dict.children != null) { defaultElProps.props.children = this.dict.children }
      }
      defaultElProps.nodeKey = defaultElProps.props.value
      lodash.merge(defaultElProps, this.elProps)
      return defaultElProps
    },
    collapseTagSize () {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small'
    }
  },
  watch: {
    value (value) {
      this.setValue(value)
    }
  },
  methods: {
    initData () {
      d2CrudPlus.util.dict.get(this.dict).then(ret => {
        this.$set(this, 'data', ret)
        this.setValue(this.value)
      })
    },
    setValue (value) {
      let arrValue = value
      if (arrValue != null) {
        if (!(arrValue instanceof Array)) {
          arrValue = [arrValue]
        }
        if (this.dict.getNodes) {
          this.dict.getNodes(arrValue).then(nodes => {
            this.selectedNodes(nodes, value)
          })
        } else {
          const nodes = []
          for (const item of arrValue) {
            const data = this.data
            const node = d2CrudPlus.util.dict.getByValue(item, data, this.dict)
            if (node != null) {
              nodes.push(node)
            }
          }
          this.selectedNodes(nodes, value)
        }
      }
    },
    selectedNodes (nodes, value) {
      const selected = []
      for (const node of nodes) {
        node.id = node[this.dict.value]
        selected.push(node)
      }
      console.log('selected:', selected)
      this.$set(this, 'selected', selected)
      this.resetInputHeight()
      this.$emit('change', value)
    },
    handleCheckChange (event) {
      this.$emit('check-change', event)
    },
    handleCurrentChange (event) {
      this.$emit('current-change', event)
    },
    openDialog () {
      if (this.disabled) {
        return
      }
      this.dialogVisible = true
      setTimeout(() => {
        if (this.selected != null) {
          const ids = this.selected.map(item => item[this._elProps.props.value])
          ids.forEach(id => {
            const current = this.$refs.elTree.store.nodesMap[id]
            if (current != null) {
              this.doExpandParent(current)
            }
          })
          this.$nextTick(() => {
            if (this.multiple) {
              this.$refs.elTree.setCheckedKeys(ids, this.leafOnly)
            } else if (ids.length > 0) {
              this.$refs.elTree.setCurrentKey(ids[0])
            }
          })
        }
      }, 1)
    },
    doExpandParent (node) {
      if (node.parent != null) {
        this.doExpandParent(node.parent)
      }
      node.expanded = true
    },
    getValueKey (item) {
      if (this._elProps.props.value != null) {
        return item[this._elProps.props.value]
      } else {
        return item.value
      }
    },
    getValueLabel (item) {
      if (this._elProps.props.label != null) {
        return item[this._elProps.props.label]
      } else {
        return item.label
      }
    },
    getValueChildren (item) {
      let children = 'children'
      if (this._elProps.props.children != null) {
        children = this._elProps.props.children
      }
      return item[children]
    },
    selectSubmit () {
      const nodes = this.refreshSelected()
      let values = this.formatValue(nodes)
      this.dialogVisible = false
      this.resetInputHeight()
      if (!this.multiple) {
        values = values && values.length > 0 ? values[0] : undefined
      }
      this.$emit('input', values)
    },
    refreshSelected () {
      let nodes = null
      if (this.multiple) {
        nodes = this.$refs.elTree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
      } else {
        const node = this.$refs.elTree.getCurrentNode()
        if (node == null) {
          nodes = []
        } else {
          nodes = [node]
        }
      }
      if (this.ignoreFullCheckedChildren) {
        nodes = this.filterFullCheckedChildren(nodes)
      }
      if (this.filter != null) {
        nodes = this.filter(nodes)
      }
      console.log('selected', this.selected)
      this.$set(this, 'selected', nodes)
      return nodes
    },
    resetInputHeight () {
      if (this.collapseTags && !this.filterable) return
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        const inputChildNodes = this.$refs.reference.$el.childNodes
        const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        const height = this.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px'
        input.style.height = height
        if (this.visible && this.emptyText !== false) {
          this.broadcast('ElSelectDropdown', 'updatePopper')
        }
      })
    },
    filterFullCheckedChildren (nodes) {
      const ignored = new Set()
      for (const item of nodes) {
        const children = this.getValueChildren(item)
        if (children != null) {
          for (const child of children) {
            ignored.add(this.getValueKey(child))
          }
        }
      }
      const values = []
      for (const item of nodes) {
        const key = this.getValueKey(item)
        if (!ignored.has(key)) {
          values.push(item)
        }
      }
      return values
    },
    formatValue (nodes) {
      const values = []
      for (const item of nodes) {
        values.push(this.getValueKey(item))
      }
      return values
    }
  }
}
</script>
<style lang="scss">
.d2p-tree-selector{
  width: 100%;
  .el-cascader{
    width: 100%;
  }
}
</style>
