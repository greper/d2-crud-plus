<template>
  <d2-container>
    <template slot="header">日期选择</template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  ></crud-search>
    <d2-crud
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
        :loading="crud.loading"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
    >
      <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
    </d2-crud>
    <crud-footer ref="footer"
                  :current="crud.page.current"
                  :size="crud.page.size"
                  :total="crud.page.total"
                  @change="handlePaginationChange"
    >
    </crud-footer>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'formDate',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      return GetList(query)
    },
    addRequest (row) {
      this.beforeSave(row)
      return AddObj(row)
    },
    updateRequest (row) {
      this.beforeSave(row)
      return UpdateObj(row)
    },
    /**
     * 在发起请求前，将日期范围选择器中的结果放到row的start和end中去
     * @param row
     * @returns {*}
     */
    beforeSave (row) {
      return row
    },
    /**
     * 在打开对话框之前，将start和end的时间范围改成数组放到一个字段里去
     * @param opt
     */
    handleDialogOpen (opt) {
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
