<template>
  <div >
    <div>当前选中：<el-tag v-if="value">{{value}} ，{{selectedName}}</el-tag></div>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      style="height:500px"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
        <el-button   size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <!-- 同一个页面下 多个toolbar 需要设置storage名称否则会有冲突-->
        <crud-toolbar  :search.sync="crud.searchOptions.show"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                       storage="subTable"
                      @columns-filter-changed="handleColumnsFilterChanged"/>

      </div>
    </d2-crud-x>
  </div>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj } from './api'
export default {
  name: 'subTable',
  mixins: [d2CrudPlus.crud],
  props: {
    value: {
      required: false
    }
  },
  data () {
    return {
      selectedName: undefined
    }
  },
  watch: {
    value (value) {
      this.setValue(value)
    }
  },
  mounted () {
    this.setValue(this.value)
  },
  methods: {
    doAfterRefresh (query, options) {
      if (!this.selectedName && this.value) {
        const row = this.getDataById(this.value)
        if (row) {
          this.selectedName = row.name
        }
      }
    },
    setValue (value) {
      const row = this.getDataById(value)
      this.getD2CrudTable().setCurrentRow(row)
      this.emit(row)
    },
    getDataById (id) {
      return this.getD2CrudTableData().find(item => {
        return item.id === id
      })
    },
    doCurrentChange (event) {
      console.log('单行选中：', event)
      this.emit(event)
    },
    emit (row) {
      if (row == null) {
        return
      }
      this.selectedName = row.name
      this.$emit('selected', row)
      this.$emit('input', row.id)
    },
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
    }
  }
}
</script>
