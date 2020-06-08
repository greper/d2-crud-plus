<template>
  <el-checkbox-group :value="selectValue" v-bind="_elProps" style="width:100%" @input="doInput"  @change="doChange">
    <el-checkbox v-for="option in _options"
                 :key="option[dict.value]"
                 :label="option[dict.value]"
                 v-bind="option"
    >{{option[dict.label]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import dict from '../../utils/util.dicts'
// 字典radio选择器
export default {
  name: 'dict-checkbox',
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
      dictOptions: undefined,
      selectValue: ''
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
      this.setValue(newVal)
    }
  },
  methods: {
    setValue (newVal) {
      if (newVal === this.selectValue) {
        return
      }
      if (newVal == null) {
        this.selectValue = []
        return
      }
      if (typeof newVal === 'string' && this.separator != null && this.separator !== '') {
        this.selectValue = newVal.split(this.separator)
        return
      }
      this.selectValue = newVal
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
