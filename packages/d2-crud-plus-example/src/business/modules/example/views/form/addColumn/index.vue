<template>
  <crud-container  :class="{'page-compact':crud.pageOptions.compact}">
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

        <el-button size="small" type="primary" @click="addColumn"><i class="el-icon-plus"/> 增加列</el-button>

        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
      </div>
    </d2-crud-x>
  </crud-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formAddColumn',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      columnIndex: 0,
      addColumns: []
    }
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
    },
    addColumn () {
      const crudOptions = this.getCrudOptions()
      const index = ++this.columnIndex
      this.addColumns.push({
        key: 'addColumn' + index,
        title: '新增列' + index
      })
      for (const item of this.addColumns) {
        crudOptions.columns.push(item)
      }
      this.reInitColumns(crudOptions)
    }
  }
}
</script>
