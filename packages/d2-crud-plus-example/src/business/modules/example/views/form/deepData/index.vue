<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      多级数据
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮，查看如何支持多级数据（嵌套object）】</span>
      <example-helper  >
        <h3>如何支持多级数据嵌套object</h3>
        <div>
          <ul>
            <li>1、crud:{format:{flatData:{disabled:false}}}，配置开启数据扁平化</li>
            <li>3、columns:[{key:'user#gender'}]，key需要配置成‘#’号连接样式</li>
            <li>2、pageRequest之后会将嵌套数据{user:{gender:0}} 拍平成{'user#gender':0}"</li>
            <li>4、在addRequest、updateRequest会自动恢复成嵌套结构</li>
          </ul>
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
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
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
  name: 'formView',
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
      return UpdateObj(row)
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
