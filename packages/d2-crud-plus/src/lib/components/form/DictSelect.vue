<template>
    <el-select
        v-model="selectValue"
        v-bind="_elProps"
        @change="doChange"
    >
      <el-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
      >
      </el-option>
    </el-select>
</template>

<script>
import dict from '../../utils/util.dicts'
export default {
  name: 'dict-select',
  props: {
    dict: {
      type: Object,
      require: false
    },
    value: { require: false },
    separator: { default: ',', require: false },
    placeholder: { require: false },
    filterable: { default: false, require: false },
    clearable: { default: false, require: false },
    multiple: { default: false, require: false },
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
      if (this.value == null) {
        this.selectValue = []
      }
      if (typeof this.value === 'string') {
        this.selectValue = this.value.split(this.separator)
      }
      if (this.value instanceof Array) {
        this.selectValue = this.value
      }
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
