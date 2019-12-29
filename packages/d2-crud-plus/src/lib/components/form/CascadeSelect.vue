<template>
  <el-cascader
    v-model="_value"
    :options="options"
    v-bind="_elProps"
    @change="handleChange"></el-cascader>
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
      require: false
    },
    // 值
    value: { require: false },
    // el-cascader的属性,[el-cascader](https://element.eleme.cn/#/zh-CN/component/cascader)
    elProps: {
      type: Object
    }
  },
  data () {
    return {
      options: []
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
    _value: {
      get () {
        if (this.value == null) {
          return []
        }
        if (typeof this.value === 'string') {
          return this.value.split(',')
        }
        if (this.value instanceof Array) {
          return this.value
        }
        return []
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'options', data)
    })
  },
  methods: {
    handleChange ($event) {
      this.$emit('change', $event)
    }
  }
}
</script>
