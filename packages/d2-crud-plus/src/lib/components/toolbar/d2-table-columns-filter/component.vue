<style lang="scss" >
  .d2p-table-columns-filter{
    :focus {
      outline: 0;
    }
    .d2p-drawer-wrapper{
      padding:10px;
    }

    .drawer-footer{
      padding: 20px;
    }

    .component--list {
      margin: -20px;

      .title{
        font-size: 14px;
      }
      .component--list-item {
        padding: 10px;
        background-color: #FFF;
        margin-bottom: 1px;
        &.ghost {
          opacity: .5;
        }
        &:last-child {
          margin-bottom: 0px;
        }
        .component--list-item-handle {
          margin: -10px;
          padding: 10px;
          cursor: move;
          &.disabled {
            opacity: .3;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<template>
  <el-drawer
    title="列设置"
    :visible.sync="active"
    size="300px"
    class="d2p-table-columns-filter"
    append-to-body>
    <div class="d2p-drawer-wrapper">
      <!-- 全选 反选 -->
      <el-card shadow="never">
        <div class="component--list">
          <div
            key="__first__"
            class="component--list-item"
            flex="main:justify cross:center">
              <span :span="12">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="onCheckAllChange">
                  {{ showLength }} / {{ options.length }}
                </el-checkbox>
              </span>
            <span class="title">固定 / 排序</span>
          </div>
        <draggable
          ghost-class="ghost"
          handle=".handle"
          v-model="currentValue">
          <transition-group>
            <div
              v-for="(option, index) of currentValue"
              :key="option.key"
              class="component--list-item"
              flex="main:justify cross:center">
              <el-checkbox flex-box="1" v-model="currentValue[index].show">
                {{ option.title || option.key || '未命名' }}
              </el-checkbox>
              <d2-table-columns-fixed-controller
                flex-box="0"
                class="d2-mr-10"
                v-model="currentValue[index].fixed"
                @change="value => fixedChange(index, value)"/>
              <div
                flex-box="0"
                class="component--list-item-handle handle">
                <d2-icon name="bars"/>
              </div>
            </div>
          </transition-group>
        </draggable>
        </div>
      </el-card>
      <el-row class="drawer-footer" :gutter="10">
        <el-col :span="12">
          <d2-button
            size="default"
            icon="el-icon-refresh"
            label="还原"
            block
            @click="reset"/>
        </el-col>
        <el-col :span="12">
          <d2-button
            size="default"
            type="primary"
            icon="el-icon-check"
            label="确定"
            block
            @click="submit"/>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import draggable from 'vuedraggable'
import lodash from 'lodash'
import d2Button from '../d2-button/component'
import D2TableColumnsFixedController from '../d2-table-columns-fixed-controller/component'
// 输入 全部分表格列设置
// 输出 要显示的表格列 + 每列的设置

export default {
  name: 'd2-table-columns-filter',
  components: {
    draggable, d2Button, D2TableColumnsFixedController
  },
  props: {
    options: {
      type: Array,
      default: () => [],
      required: false
    },
    value: {
      type: Array,
      default: () => [],
      required: false
    },
    storage: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      currentValue: [],
      active: false,
      checkAll: false
    }
  },
  computed: {
    // 显示的数量
    showLength () {
      return this.currentValue.filter(e => e.show).length
    },
    // 半选状态
    isIndeterminate () {
      const optionsLength = this.options.length
      let result = this.showLength > 0 && optionsLength !== this.showLength
      return result
    }
  },
  watch: {
    options () {
      this.refresh()
    },
    value () {
      this.refresh()
    },
    active (value) {
      if (value === false) {
        this.refresh()
      }
    }
  },
  created () {
    let storedOptions = this.getOptionsFromStorage()
    if (storedOptions) {
      const storeHash = this.getColumnsHash(storedOptions)
      const optionHash = this.getColumnsHash(this.options)
      if (optionHash !== storeHash) {
        // 如果字段列有过修改，则不使用本地设置
        storedOptions = null
      }
    }
    this.storedOptions = storedOptions
    this.refresh()
    if (storedOptions) {
      this.submit()
    }
  },
  methods: {
    // fixed 变化时触发
    fixedChange (index, value) {
      if (value) this.currentValue[index].show = true
      if (value === 'left') this.currentValue.unshift(this.currentValue.splice(index, 1)[0])
      if (value === 'right') this.currentValue.push(this.currentValue.splice(index, 1)[0])
    },
    // 全选和反选发生变化时触发
    onCheckAllChange (value) {
      this.currentValue = this.currentValue.map(e => {
        e.show = value
        return e
      })
    },
    // 根据 value 和 options 计算 currentValue
    // 规则
    // currentValue.length === options.length
    // value.length <= options.length
    refresh () {
      const options = lodash.cloneDeep(this.options)
      const value = lodash.cloneDeep(this.value)
      let currentValue = []
      let checkAll = true
      // 设置比较源
      let compareSource = options
      if (this.storedOptions != null) {
        compareSource = this.storedOptions
      }
      // 计算
      compareSource.forEach(option => {
        // 在 value 尝试找到这个项目
        // 没有的话使用 option 中的默认值
        let storeItem = null
        if (this.storedOptions != null) {
          storeItem = option
          option = options.find(column => column.key === option.key)
        }
        let item = value.find(column => column.key === option.key)
        let show = item != null && item.show !== false
        item = item || option

        if (storeItem) {
          // 使用本地保存的设置
          show = storeItem.show
          item.fixed = storeItem.fixed
        }
        item.show = show
        if (!show) checkAll = false
        currentValue.push(item)
      })
      this.currentValue = currentValue
      this.checkAll = checkAll
    },
    // 开始选择
    start () {
      this.active = true
    },
    // 还原
    reset () {
      this.currentValue = lodash.cloneDeep(this.options)
      this.submit()
    },
    // 确认
    submit () {
      const result = []
      this.currentValue.forEach((item, index) => {
        result.push(item)
      })
      this.saveOptionsToStorage(result)
      this.emit(result)
      this.active = false
    },
    emit (result) {
      this.$emit('input', [])
      this.$emit('change', [])
      // TODO 如果只触发一次，有底部滚动条时，原本被遮住的列显示后，固定操作列会显示错乱
      this.$nextTick(() => {
        this.$emit('input', result)
        this.$emit('change', result)
      })
    },
    saveOptionsToStorage (value) {
      if (!this.storage) {
        return
      }
      let key = this.getStorageKey()
      let saved = this.getStorageTable()
      if (!saved) {
        saved = {}
      }
      const storedOptions = []
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        const target = {
          key: item.key,
          show: item.show != null ? item.show : true,
          fixed: item.fixed
        }
        storedOptions.push(target)
      }
      this.storedOptions = storedOptions
      saved[key] = storedOptions
      this.saveStorageTable(saved)
    },
    getOptionsFromStorage () {
      if (!this.storage) {
        return
      }
      const json = this.getStorageTable()
      if (json) {
        const key = this.getStorageKey()
        return json[key]
      }
    },
    getStorageKey () {
      let key = location.href
      if (this.$route) {
        key = this.$route.path
      }
      return key
    },
    getStorageName () {
      return 'd2CrudPlus.columnsFilter'
    },
    getStorageTable () {
      const name = this.getStorageName()
      const saved = localStorage.getItem(name)
      if (saved == null) {
        return
      }
      return JSON.parse(saved)
    },
    saveStorageTable (saved) {
      const name = this.getStorageName()
      localStorage.setItem(name, JSON.stringify(saved))
    },
    getColumnsHash (columns) {
      const keys = []
      for (let item of columns) {
        keys.push(item)
      }
      keys.sort()
      let hash = ''
      for (let key of keys) {
        hash += key
      }
      return hash
    }
  }
}
</script>
