<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">隐藏翻页</template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

        <!-- 同一个页面下 多个toolbar 需要设置storage名称否则会有冲突-->
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      storage="appositionTable"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj } from './api'
export default {
  name: 'formNoPagination',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      query.size = 999999999999
      return GetList(query).then(ret => {
        // 假如你返回的只是一个数组
        // 你可以构造一个返回结构
        // ret.data = {
        //   records: ret.data,
        //   total: ret.data.length,
        //   size: 99999999,
        //   current: 1
        // }
      })
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
