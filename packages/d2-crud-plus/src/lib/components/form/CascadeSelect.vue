<template>
  <el-cascader
    v-model="_value"
    :options="options"
    @change="handleChange"></el-cascader>
</template>

<script>
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
      this.$set(this, 'options', data)
    })
  },
  methods: {
    setValue (newVal) {
    },
    handleChange ($event) {
      console.log('event:', $event)
      // this.$emit('input', $event)
    }
  }
}
</script>
