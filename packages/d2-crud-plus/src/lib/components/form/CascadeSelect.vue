<template>
  <el-cascader
    class="d2p-cascade"
    :value="selectValue"
    :options="_options"
    v-bind="_elProps"
    @input="doInput"
    @change="doChange" style="width:100%"></el-cascader>
</template>

<script>
import { merge } from 'lodash'
import dict from '../../utils/util.dicts'
// 级联选择器
export default {
  name: 'cascade-select',
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
      dictOptions: undefined,
      selectValue: undefined
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
    this.setValue(this.value)
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictOptions', data)
      if (this.onReady != null) {
        this.onReady(this)
      }
    })
  },
  watch: {
    value: function (newVal, oldVal) {
      if (this.selectValue === newVal) {
        return
      }
      this.setValue(newVal)
    }
  },
  methods: {
    setValue (value) {
      if (value == null) {
        this.selectValue = []
        return
      }
      if (typeof this.value === 'string') {
        this.selectValue = value.split(',')
        return
      }
      if (value instanceof Array) {
        this.selectValue = value
        return
      }
      this.selectValue = []
    },
    doInput ($event) {
      this.$emit('input', $event)
    },
    doChange ($event) {
      this.$emit('change', $event)
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
}
</style>
