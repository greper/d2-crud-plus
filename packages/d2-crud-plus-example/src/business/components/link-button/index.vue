<template>
 <el-button :type="type" :size="size" :icon="icon" @click="doLink">
   <slot></slot>
 </el-button>
</template>
<script>
export default {
  name: 'link-button',
  props: {
    href: {
      type: String,
      required: false
    },
    target: {
      type: String,
      required: false,
      default: '_blank'
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String
    },
    icon: {
      type: String,
      required: false,
      default: 'el-icon-link'
    }
  },
  data () {
    return {
      drawer: false
    }
  },
  created () {
    if (this.open != null) {
      this.drawer = this.open
    }
  },
  methods: {
    doLink () {
      if (this.target === '_blank') {
        window.open(this.href)
      } else {
        window.href = this.href
      }
    }
  }
}
</script>
