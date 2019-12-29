<template>
  <span>
    <img v-for="url in urls"  :key="url" :src="url" :style="{width:'auto',height:imgHeight,'margin-right':'10px'}" />
  </span>
</template>

<script>
// 图片行展示组件
export default {
  name: 'd2p-images-format',
  props: {
    // 图片的url
    // 'url' 或 ['url1','url2']
    value: {
      type: [String, Array],
      require: true
    },
    // 图片的高度设置
    height: {
      require: false,
      default: 30
    }
  },
  data () {
    return {
      dictData: []
    }
  },
  computed: {
    urls () {
      let urls = []
      if (this.value == null) {
        return urls
      }
      if (typeof (this.value) === 'string') {
        urls.push(this.value)
      } else if (this.value instanceof Array) {
        for (let item of this.value) {
          if (item.url != null) {
            urls.push(item.url)
          } else {
            urls.push(item)
          }
        }
      } else {
        urls.push(this.value.url)
      }
      return urls
    },
    imgHeight () {
      if (typeof (this.height) === 'number') {
        return this.height + 'px'
      }
      return this.height
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      // this.$emit('input', !this.value)
    }
  }
}
</script>
<style lang="scss">
</style>
