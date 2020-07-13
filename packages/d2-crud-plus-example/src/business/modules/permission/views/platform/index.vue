<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">平台管理</template>
        <d2-crud-x
                ref="d2Crud"
                :columns="crud.columns"
                :data="crud.list"
                :rowHandle="crud.rowHandle"
                edit-title="修改"
                :add-template="crud.addTemplate"
                :add-rules="crud.addRules"
                :edit-template="crud.editTemplate"
                :edit-rules="crud.editRules"
                :form-options="crud.formOptions"
                :options="crud.options"
                :pagination="crud.pagination"
                @pagination-change="handlePaginationChange"
                @dialog-open="handleDialogOpen"
                @row-edit="handleRowEdit"
                @row-add="handleRowAdd"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @form-data-change="handleFormDataChange">

          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" class="d2-mb-5" v-permission="'permission:platform:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

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
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj, GetObj } from './api'
export default {
  name: 'Platform',
  mixins: [d2CrudPlus.crud],
  data () {
    return {}
  },
  methods: {
    initAfter () {
      // 检查权限
      if (!this.hasPermissions('permission:platform:edit')) {
        this.crud.rowHandle.edit.disabled = true
        //  delete this.crud.rowHandle.edit  // 也可以隐藏不显示
      }
      if (!this.hasPermissions('permission:platform:del')) {
        this.crud.rowHandle.remove.disabled = true
        //  delete this.crud.rowHandle.remove  // 也可以隐藏不显示
      }
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
    },
    infoRequest (row) {
      return GetObj(row.id)
    }
  }
}
</script>
