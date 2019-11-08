<template>
  <span>{{ doFormat}}</span>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'date-format',
  props: {
    value: { required: true },
    valueFormat: { required: false },
    format: { default: 'YYYY-MM-DD HH:mm:ss', required: false }
  },
  computed: {
    doFormat () {
      if (this.value == null || this.value === '') {
        return ''
      }
      let date = null
      if (this.valueFormat != null) {
        date = dayjs(this.value, this.valueFormat)
      } else {
        date = dayjs(this.value)
      }
      return date.format(this.format)
    }
  },
  data () {
    return {
      item: {}
    }
  },
  created () {},
  methods: {}
}
</script>
