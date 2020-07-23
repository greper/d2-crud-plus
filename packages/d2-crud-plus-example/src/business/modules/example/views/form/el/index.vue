<template>
  <d2-container class="formEl" :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">其他elementUI组件</template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners">

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
  name: 'formEl',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions
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
    },
    handleSearchDataChange (event) {
      console.log('search data change:', event)
    }
  }
}
</script>

<style lang="scss">
  .form-el-autocomplete{
    line-height: 20px;
    padding-top:5px;
    padding-bottom: 5px;
    .addr{
      font-size: 12px;
      color:gray
    }
  }
</style>
