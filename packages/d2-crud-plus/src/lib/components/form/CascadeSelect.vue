<template>
  <el-cascader
    v-model="_value"
    :options="options"
    v-bind="_elProps"
    @change="handleChange"></el-cascader>
</template>

<script>
import { merge } from 'lodash'
import dict from '../../utils/util.dicts'
export default {
  name: 'cascade-select',
  props: {
    dict: {
      type: Object,
      require: false
    },
    value: { require: false },
    elProps: {
      type: Object
    }
  },
  data () {
    return {
      options: []
    }
  },
  computed: {
    _elProps () {
      let defaultElProps = { props: {} }
      if (this.dict != null && this.dict.label != null) {
        defaultElProps.props.label = this.dict.label
      }
      if (this.dict != null && this.dict.value != null) {
        defaultElProps.props.value = this.dict.value
      }
      merge(defaultElProps, this.elProps)
      console.log('props:', defaultElProps)
      return defaultElProps
    },
    _value: {
      get () {
        if (this.value == null) {
          return []
        }
        if (typeof this.value === 'string') {
          return this.value.split(',')
        }
        if (this.value instanceof Array) {
          return this.value
        }
        return []
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  mounted () {
    dict.get(this.dict).then((data) => {
      console.log('dict data:', data)
      this.$set(this, 'options', data)
    })
  },
  methods: {
    setValue (newVal) {
    },
    handleChange ($event) {
      this.$emit('change', $event)
    }
  }
}
</script>
