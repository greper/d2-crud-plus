<template>
  <div >
    <div>当前选中：<span class="current_selected"><el-tag v-if="value">{{value}} ，{{selectedName}}</el-tag></span></div>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" @search-data-change="handleSearchDataChange"  />
        <el-button   size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <!-- 同一个页面下 多个toolbar 需要设置storage名称，否则列设置保存会有冲突-->
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

/**
 * 子表格当成一个普通组件来被父表格引用
 */
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
      selectedId: undefined,
      selectedName: undefined
    }
  },
  watch: {
    value (value) {
      this.$emit('change', value)// 可以触发上级表单的valueChange方法
      if (this.selectedId === this.value) {
        return
      }
      this.setValue(value)
    }
  },
  created () {
    this.selectedId = this.value
  },
  methods: {
    doAfterRefresh (query, options) {
      // 查询结束后，查找选中id的name
      this.resetSelectName()
    },
    setValue (value) {
      this.selectedId = value
      const row = this.getDataById(value)
      if (row) {
        this.getD2CrudTable().setCurrentRow(row)
      }
    },
    getDataById (id) {
      const d2CrudTableData = this.getD2CrudTableData()
      return d2CrudTableData == null || d2CrudTableData.find(item => {
        return item.id === id
      })
    },
    resetSelectName () {
      if (!this.selectedName && this.selectedId) {
        const row = this.getDataById(this.selectedId)
        if (row) {
          this.selectedName = row.name
        }
      }
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
      this.selectedId = row.id
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
