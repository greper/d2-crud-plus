<template>
    <el-select
        v-model="selectValue"
        :placeholder="placeholder"
        :filterable="filterable"
        :clearable="clearable"
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
    clearable: { defaultValue: false, require: false }
  },
  data () {
    return {
      options: [],
      selectValue: this.value
    }
  },
  computed: {
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      this.$set(this, 'options', data)
    })
  },
  watch: {
    value: function (newVal, oldVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
      }
    }
  },
  methods: {
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
