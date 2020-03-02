<template>
  <el-checkbox-group v-model="selectValue" v-bind="_elProps"  @change="doChange">
    <el-checkbox v-for="option in options"
                 :key="option[dict.value]"
                 :label="option[dict.value]" >{{option[dict.label]}}</el-checkbox>
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
      require: false
    },
    // 值
    value: { type: [Number, Boolean, String, Array], require: false },
    // value的分隔符<br/>
    // 如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // el-checkbox的配置，[el-checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)
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
