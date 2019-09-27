<template>
    <el-select
        v-model="selectValue"
        :placeholder="placeholder"
        :filterable="filterable"
        :clearable="clearable"
        :multiple="multiple"
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
    placeholder: { require: false },
    value: { require: false },
    filterable: { defaultValue: false, require: false },
    clearable: { defaultValue: false, require: false },
    multiple: { defaultValue: false, require: false }
  },
  data () {
    return {
      options: [],
      selectValue: ''
    }
  },
  computed: {
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
      if (!this.multiple) {
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
        this.selectValue = this.value.split(',')
      }
      if (this.value instanceof Array) {
        this.selectValue = this.value
      }
      console.log('select:', this.selectValue)
    },
    handleClick () {
      // this.$emit('input', !this.value)
    },
    doChange ($event, e2) {
      console.log('event:', $event, e2)
      this.$emit('input', $event)
    }
  }
}
</script>
