<template>
  <el-select
    class="d2p-dict-select"
    :value="currentValue"
    v-bind="_elProps"
    :value-key="dict.value"
    :disabled="disabled" :readonly="readonly"
    @input="onInput"
    @change="doChange"
    style="width:100%"
  >
    <el-option
      v-for="option in _options"
      :key="option[dict.value]"
      :value="option[dict.value]"
      :label="option[dict.label]"
      v-bind="option"
    >
    </el-option>
  </el-select>
</template>

<script>
import input from '../../mixins/input'
import inputDict from '../../mixins/input-dict'

// 字典选择器
export default {
  name: 'dict-select',
  mixins: [input, inputDict],
  props: {
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
    },
    // 数据字典配置
    // {url:'xxx',data:[],value:'',label:'',children:''}
    dict: {
      type: Object,
      require: false,
      default: () => {
        return { data: undefined }
      }
    },
    // 选项列表，优先级比dict高
    options: {
      type: Array,
      require: false
    },
    // 选项数据ready
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
      return {
        placeholder: this.placeholder,
        filterable: this.filterable,
        clearable: this.clearable,
        multiple: this.multiple,
        ...this.elProps
      }
    }
  },
  created () {
  },
  methods: {
    doChange (value) {
      // log.debug('changed', value)
    },
    setValue (newVal) {
      if (!this._elProps.multiple) {
        // 单选
        if (newVal === this.currentValue) {
          return
        }
        this.currentValue = newVal
        return
      }
      // 多选
      if (newVal == null) {
        this.currentValue = []
        return
      }
      if (typeof newVal === 'string' && this.separator != null && this.separator !== '') {
        this.currentValue = newVal.split(this.separator)
        return
      }
      if (!(newVal instanceof Array)) {
        this.currentValue = [newVal]
        return
      }

      //  TODO 重置表单时，多选的value会重置为[null]
      const val = []
      for (const item of newVal) {
        if (item != null) {
          val.push(item)
        }
      }
      this.currentValue = val
      if (newVal.length === 1 && newVal[0] == null) {
        this.onInput(val)
      }
    }
  }
}
</script>
