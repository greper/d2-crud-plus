<template>
  <el-cascader
    class="d2p-cascade"
    :value="currentValue"
    :options="_options"
    :disabled="disabled" :readonly="readonly"
    v-bind="_elProps"
    @input="onInput" ></el-cascader>
</template>

<script>
import { merge } from 'lodash'
import dict from '../../utils/util.dicts'
import input from '../../mixins/input'

// 级联选择器
export default {
  name: 'cascade-select',
  mixins: [input],
  props: {
    // 数据字典<br/>
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    // 值
    value: { require: false },
    // el-cascader的属性,[el-cascader](https://element.eleme.cn/#/zh-CN/component/cascader)
    elProps: {
      type: Object
    },
    // 选项列表，优先级比dict高
    options: {
      type: Array,
      require: false
    },
    onReady: {
      type: Function,
      require: false
    }
  },
  data () {
    return {
      dictOptions: undefined
    }
  },
  computed: {
    _elProps () {
      let defaultElProps = { props: {} }
      if (this.dict != null && this.dict.label != null) {
        defaultElProps.props.label = this.dict.label
      }
      if (this.dict != null && this.dict.value != null) {
        defaultElProps.props.value = this.dict.value
      }
      merge(defaultElProps, this.elProps)
      return defaultElProps
    },
    _options () {
      if (this.options != null) {
        return this.options
      }
      if (this.dictOptions != null) {
        return this.dictOptions
      }
      return []
    }
  },
  created () {
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictOptions', data)
      if (this.onReady != null) {
        this.onReady(this)
      }
    })
  },
  methods: {
    setValue (value) {
      if (value == null) {
        this.currentValue = []
        return
      }
      if (typeof this.value === 'string') {
        this.currentValue = value.split(',')
        return
      }
      if (value instanceof Array) {
        this.currentValue = value
        return
      }
      this.currentValue = []
    }
  }
}
</script>
<style lang="scss">
.d2p-cascade {
  /*兼容ie11*/
  .el-cascader__tags .el-tag>span{
    flex:auto
  }
  width: 100%;
}
</style>
