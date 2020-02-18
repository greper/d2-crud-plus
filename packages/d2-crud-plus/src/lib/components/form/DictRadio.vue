<template>
  <el-radio-group v-model="selectValue" v-bind="_elProps"  @change="doChange">
    <el-radio v-for="option in options"
              :key="option.value"
              :label="option.value">{{option.label}}</el-radio>
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
      require: false
    },
    // 值
    value: { require: false },
    // value的分隔符<br/>
    // 多选时，如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // el-radio的配置，[el-radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)
    elProps: {
      type: Object,
      require: false
    }
  },
  data () {
    return {
      options: [],
      selectValue: ''
    }
  },
  computed: {
    _elProps () {
      return {
        ...this.elProps
      }
    }
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'options', data)
    })
    this.setValue(this.value)
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
