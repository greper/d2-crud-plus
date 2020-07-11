<template>
  <span class="d2p-toolbar" >
    <el-button v-if="refresh!=null"  size="small" icon="el-icon-refresh" circle title="刷新列表" @click="doRefresh"/>
    <el-button v-if="search!=null" :type="search?'primary':''"  size="small" icon="el-icon-search" circle title="显示/隐藏查询工具条" @click="doSearch"/>
    <el-button v-if="compact!=null" :type="compact?'primary':''"  size="small" icon="el-icon-rank" circle title="紧凑型页面" @click="doCompact"/>
    <el-button v-if="columns!=null" type="success" size="small" icon="el-icon-set-up" circle title="列设置"  @click="doColumnsFilter"/>

    <d2-table-columns-filter v-if="columns!=null" ref="columnsSetup" v-model="columnsFilter.value" :options="columnsFilter.options" @change="handleColumnsFilterChanged"/>

  </span>
</template>

<script>
import D2TableColumnsFilter from './d2-table-columns-filter/component'
import lodash from 'lodash'
export default {
  name: 'crud-toolbar',
  components: { D2TableColumnsFilter },
  props: {
    search: {
      type: Boolean,
      default: undefined
    },
    refresh: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean,
      default: undefined
    },
    columns: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      columnsFilter: {
        value: [],
        options: []
      }
    }
  },
  created () {
    this.columnsFilter.options = lodash.cloneDeep(this.columns)
    this.columnsFilter.value = lodash.cloneDeep(this.columns)
  },
  methods: {
    doRefresh () {
      this.$emit('refresh')
    },
    doSearch () {
      this.$emit('update:search', !this.search)
    },
    doCompact () {
      this.$emit('update:compact', !this.compact)
    },
    doColumnsFilter () {
      this.$refs.columnsSetup.start()
    },
    handleColumnsFilterChanged (event) {
      this.$emit('columns-filter-changed', event)
    }
  }
}
</script>
<style lang="scss">
  .d2p-toolbar {
    float: right;
  }
</style>
