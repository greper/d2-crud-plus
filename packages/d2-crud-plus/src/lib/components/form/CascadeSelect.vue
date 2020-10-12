<template>
  <el-cascader
    class="d2p-cascade"
    :value="currentValue"
    :options="_options"
    :disabled="disabled" :readonly="readonly"
    v-bind="_elProps"
    @input="onInput" />
</template>

<script>
import { merge } from 'lodash'
import input from '../../mixins/input'
import inputDict from '../../mixins/input-dict'

// 级联选择器
export default {
  name: 'cascade-select',
  mixins: [input, inputDict],
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
    value: {
      default: () => {
        return []
      },
      require: false
    },
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
    }
  },
  computed: {
    _elProps () {
      const defaultElProps = { props: {} }
      if (this.dict && this.dict.label) {
        defaultElProps.props.label = this.dict.label
      }
      if (this.dict && this.dict.value) {
        defaultElProps.props.value = this.dict.value
      }
      merge(defaultElProps, this.elProps)
      console.log('cascade:', defaultElProps, this.elProps)
      return defaultElProps
    }

  },
  created () {
  },
  methods: {
    setValue (value) {
      console.log('cascader value', value)
      if (this._elProps.showAllLevels === false && this._elProps.props && this._elProps.props.emitPath === false) {
        this.currentValue = value
        return
      }
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
