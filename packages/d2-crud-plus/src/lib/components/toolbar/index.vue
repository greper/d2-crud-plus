<template>
  <span class="d2p-toolbar" >
    <el-button v-if="refresh!=null"  size="small" icon="el-icon-refresh" circle title="刷新列表" @click="doRefresh"/>
    <el-button v-if="search!=null" :type="search?'primary':''"  size="small" icon="el-icon-search" circle title="显示/隐藏查询" @click="doSearch"/>
    <el-button v-if="compact!=null" :type="compact?'primary':''"  size="small" icon="el-icon-rank" circle title="紧凑型页面" @click="doCompact"/>
    <el-button v-if="columns!=null" type="success" size="small" icon="el-icon-set-up" circle title="列设置"  @click="doColumnsFilter"/>

    <d2-table-columns-filter v-if="columns!=null" ref="columnsSetup"
                             v-model="columnsFilter.value"
                             :options="columnsFilter.options"
                             :storage="storage"
                             @change="handleColumnsFilterChanged"/>

  </span>
</template>

<script>
import D2TableColumnsFilter from './d2-table-columns-filter/component'
import lodash from 'lodash'
export default {
  name: 'crud-toolbar',
  components: { D2TableColumnsFilter },
  props: {
    /**
     * 是否显示查询
     * 传null，则不显示按钮
     */
    search: {
      type: Boolean,
      default: undefined
    },
    /**
     * 是否显示刷新
     */
    refresh: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示紧凑模式
     */
    compact: {
      type: Boolean,
      default: undefined
    },
    /**
     * 列配置
     */
    columns: {
      type: Array,
      default: undefined
    },
    /**
     * 是否保存用户列设置
     * 传string则表示传入缓存的主key
     */
    storage: {
      type: [String, Boolean],
      default: true
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
