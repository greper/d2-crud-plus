<template>
  <div class="d2p-tree-selector">
    <div  class="el-cascader el-cascader--default">
      <div class="el-input el-input--default el-input--suffix">
        <el-input ref="reference" />
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner"><i class="el-input__icon el-icon-arrow-down" @click="openDialog"></i>
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
          :props="_elProps.props"
          show-checkbox
          @check-change="handleCheckChange"
          :node-key = "_elProps.props.value"
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
import _merge from 'lodash.merge'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'd2p-tree-selector',
  props: {
    value: {
      type: [String, Array, Object]
    },
    filter: { //  value中的nodes过滤方法 参数为nodes
      type: Function,
      require: false
    },
    ignoreFullCheckedChidren: { type: Boolean, default: true }, // 是否忽略选中节点的子节点
    leafOnly: { type: Boolean, default: false }, // 是否只返回叶子节点
    includeHalfChecked: { type: Boolean, default: false }, // 是否包含半选节点
    elProps: {
      type: Object
    },
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
    this.initData()
  },
  computed: {
    _elProps () {
      let defaultElProps = {
        showCheckbox: true,
        props: {}
      }
      if (this.dict != null) {
        if (this.dict.label != null) { defaultElProps.props.label = this.dict.label }
        if (this.dict.value != null) { defaultElProps.props.value = this.dict.value }
        if (this.dict.children != null) { defaultElProps.props.children = this.dict.children }
      }
      _merge(defaultElProps, this.elProps)
      return defaultElProps
    },
    collapseTagSize () {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small'
    }
  },
  methods: {
    initData () {
      d2CrudPlus.util.dict.get(this.dict).then(ret => {
        this.$set(this, 'data', ret)
        if (this.value != null) {
          let selected = []
          for (let item of this.value) {
            let node = d2CrudPlus.util.dict.getByValue(item, ret, this.dict)
            if (node != null) {
              node.id = node[this.dict.value]
              selected.push(node)
            }
          }
          this.$set(this, 'selected', selected)
          this.resetInputHeight()
        }
      })
    },
    handleCheckChange () {
    },
    openDialog () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.elTree.setCheckedKeys(this.value, this.leafOnly)
      })
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
      let nodes = this.refreshSelected()
      let values = this.formatValue(nodes)
      this.dialogVisible = false
      this.resetInputHeight()
      this.$emit('input', values)
      this.$emit('change', values)
    },
    refreshSelected () {
      let nodes = this.$refs.elTree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
      if (this.filter != null) {
        nodes = this.filter(nodes)
      } else if (this.ignoreFullCheckedChidren) {
        nodes = this.filterFullCheckedChildren(nodes)
      }
      this.$set(this, 'selected', nodes)
      return nodes
    },
    resetInputHeight () {
      if (this.collapseTags && !this.filterable) return
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        let inputChildNodes = this.$refs.reference.$el.childNodes
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        let height = this.selected.length === 0
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
      let ignored = new Set()
      for (let item of nodes) {
        let children = this.getValueChildren(item)
        if (children != null) {
          for (let child of children) {
            ignored.add(this.getValueKey(child))
          }
        }
      }
      let values = []
      for (let item of nodes) {
        let key = this.getValueKey(item)
        if (!ignored.has(key)) {
          values.push(item)
        }
      }
      return values
    },
    formatValue (nodes) {
      let values = []
      for (let item of nodes) {
        values.push(this.getValueKey(item))
      }
      return values
    }
  }
}
</script>
<style>

</style>
