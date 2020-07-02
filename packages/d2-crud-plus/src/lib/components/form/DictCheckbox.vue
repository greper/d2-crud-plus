<template>
  <el-checkbox-group :value="currentValue" :disabled="disabled" :readonly="readonly"  v-bind="_elProps" style="width:100%" @input="onInput">
    <el-checkbox :disabled="disabled" :readonly="readonly" v-for="option in _options"
                 :key="option[dict.value]"
                 :label="option[dict.value]"
                 v-bind="option"
    >{{option[dict.label]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import dict from '../../utils/util.dicts'
import input from '../../mixins/input'
// 字典radio选择器
export default {
  name: 'dict-checkbox',
  mixins: [input],
  props: {
    // 数据字典
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default: () => {
        return {}
      }
    },
    // 值
    value: { type: [Number, String, Boolean, Array], require: false },
    // value的分隔符<br/>
    // 如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // el-checkbox的配置，[el-checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)
    elProps: {
      type: Object,
      require: false
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
      return {
        ...this.elProps
      }
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
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictOptions', data)
      if (this.onReady != null) {
        this.onReady(this)
      }
    })
  },
  methods: {
    setValue (newVal) {
      if (newVal === this.currentValue) {
        return
      }
      if (newVal == null) {
        this.currentValue = []
        return
      }
      if (typeof newVal === 'string' && this.separator != null && this.separator !== '') {
        this.currentValue = newVal.split(this.separator)
        return
      }
      this.currentValue = newVal
    }
  }
}
</script>
