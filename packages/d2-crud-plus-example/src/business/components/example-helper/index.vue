<template>
  <div  style="margin-left: 16px;float:right;height: 20px">
    <el-button @click="drawer = true" size="mini" type="primary">
      帮助
    </el-button>
    <el-drawer
            :title="title"
            :visible.sync="drawer"
            direction="rtl"
            size="50%"
    >
      <div v-bind:style="{ padding:'20px','height': helperHeight ,'overflow-y': 'scroll',border: '1px solid #eee'}" >
        <slot></slot>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'example-helper',
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: '帮助说明'
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
  computed: {
    helperHeight () {
      let height = document.documentElement.clientHeight - 100
      console.log('height:', height)
      return height + 'px'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
