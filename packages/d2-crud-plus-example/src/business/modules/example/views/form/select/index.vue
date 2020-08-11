<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">选择组件
      <example-helper title="select" >
        <div>
          <link-button type="text" target="_blank" href="http://greper.gitee.io/d2-crud-plus-docs/guide/types.html#选择框">选择组件类型</link-button>
          <link-button type="text" href="http://greper.gitee.io/d2-crud-plus-docs/guide/components/dict-select.html">DictSelect组件</link-button>
        </div>
      </example-helper>
    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
          <el-button size="small" type="primary" @click="getXxxDict">根据dict获取字典data</el-button>
          <el-button size="small" type="primary" @click="getStatusDict">根据列key获取字典data</el-button>
          <el-button size="small" type="primary" @click="getXxxDictMap">获取字典map</el-button>
        </el-button-group>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
    </d2-crud-x>

  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formSelect',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      show: true
    }
  },
  mounted () {
    console.log('dict cache：', d2CrudPlus.util.dict.getCache())
  },
  methods: {
    /**
     * 根据字典配置获取字典数据
     */
    getXxxDict () {
      this.getDictData({ url: '/dicts/OpenStatusEnum' }).then(data => {
        this.$alert(JSON.stringify(data), '根据dict获取数据字典', {
          confirmButtonText: '确定'
        }).catch(() => {})
      })
    },
    getXxxDictMap () {
      this.getDictData({ url: '/dicts/OpenStatusEnum' }, { returnType: 'dataMap' }).then(data => {
        this.$alert(JSON.stringify(data), '返回dataMap', {
          confirmButtonText: '确定'
        }).catch(() => {})
      })
    },
    /**
     * 根据字段key获取字典数据
     */
    getStatusDict () {
      this.getDictData('status').then(data => {
        this.$alert(JSON.stringify(data), '根据列key获取数据字典', {
          confirmButtonText: '确定'
        })
      })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return GetList(query)
    },
    addRequest (row) {
      return AddObj(row)
    },
    updateRequest (row) {
      console.log('----', row)
      return UpdateObj(row)
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
