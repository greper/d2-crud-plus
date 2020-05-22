<template>
  <el-radio-group v-model="selectValue" v-bind="_elProps"  @change="doChange">
    <el-radio v-for="option in _options"
              :key="option[dict.value]"
              :label="option[dict.value]">{{option[dict.label]}}</el-radio>
  </el-radio-group>
</template>

<script>
import dict from '../../utils/util.dicts'
// 字典radio选择器
export default {
  name: 'dict-radio',
  props: {
    // 数据字典
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default () {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    // 值
    value: { require: false },
    // el-radio的配置，[el-radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)
    elProps: {
      type: Object,
      require: false
    },
    // 选项列表，优先级比dict高
    options: {
      type: Array,
      require: false
    }
  },
  data () {
    return {
      dictOptions: [],
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
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'dictOptions', data)
    })
    this.setValue(this.value)
  },
  watch: {
    value: function (newVal, oldVal) {
      this.setValue(newVal)
    }
  },
  methods: {
    setOptions (options) {
      this.$set(this, 'dictOptions', options)
    },
    setValue (newVal) {
      if (newVal === this.selectValue) {
        return
      }
      this.selectValue = newVal
    },
    handleClick () {
      // this.$emit('input', !this.value)
    },
    doChange ($event) {
      this.$emit('input', $event)
      this.$emit('change', $event)
    }
  }
}
</script>
