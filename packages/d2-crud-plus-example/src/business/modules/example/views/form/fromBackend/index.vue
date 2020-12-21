<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      异步后台获取crud配置
      <span style="color:gray;font-size: 12px">【主要看getCrudOptions方法】</span>
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
import { AddObj, GetList, UpdateObj, DelObj, GetCrud } from './api'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formView',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      show: true
    }
  },
  methods: {
    async getCrudOptions () {
      const ret = await GetCrud() // 异步从后台获取crud
      // 警告： eval有安全风险，此处为了演示支持配置方法。
      // 如无必要，请不要用eval，如果crud配置中并不需要配置方法的话，直接 return JSON.parse(ret.data) 即可
      // eslint-disable-next-line no-eval
      const getCrudOptions = eval(ret.data)
      return getCrudOptions(this)
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
