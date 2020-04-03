<template>
    <el-select
        v-model="selectValue"
        v-bind="_elProps"
        :value-key="dict.value"
        @change="doChange"
    >
      <el-option
          v-for="option in options"
          :key="option[dict.value]"
          :value="option[dict.value]"
          :label="option[dict.label]"
      >
      </el-option>
    </el-select>
</template>

<script>
import dict from '../../utils/util.dicts'
// 字典选择器
export default {
  name: 'dict-select',
  props: {
    // 数据字典
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false
    },
    // 值
    value: { type: [Number, String, Boolean, Array], require: false },
    // value的分隔符<br/>
    // 多选时，如果value为string，则以该分隔符分割成多个展示<br/>
    // 传入空字符串，表示不分割<br/>
    separator: { default: ',', require: false },
    // 等效于 elProps.placeholder
    placeholder: { require: false },
    // 等效于 elProps.filterable
    filterable: { default: false, require: false },
    // 等效于 elProps.clearable
    clearable: { default: false, require: false },
    // 等效于 elProps.multiple
    multiple: { default: false, require: false },
    // el-select的配置，[el-select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)
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
        placeholder: this.placeholder,
        filterable: this.filterable,
        clearable: this.clearable,
        multiple: this.multiple,
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
      if (this.selectValue === newVal) {
        return
      }
      this.setValue(newVal)
    }
  },
  methods: {
    setValue (newVal) {
      if (!this._elProps.multiple) {
        if (newVal === this.selectValue) {
          return
        }
        this.selectValue = newVal
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
      if (!(newVal instanceof Array)) {
        this.selectValue = [newVal]
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
