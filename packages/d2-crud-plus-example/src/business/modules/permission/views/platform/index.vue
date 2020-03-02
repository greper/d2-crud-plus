<template>
    <d2-container>
        <template slot="header"></template>
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" ></crud-search>
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
                @dialog-open="handleDialogOpen"
                @row-edit="handleRowEdit"
                @row-add="handleRowAdd"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @form-data-change="handleFormDataChange">
            <el-button slot="header" class="d2-mb-5" v-permission="'permission:platform:add'" size="small" type="primary" @click="addRow">新增</el-button>
        </d2-crud>
        <crud-footer ref="footer" slot="footer"
                     :current="crud.page.current"
                     :size="crud.page.size"
                     :total="crud.page.total"
                     @change="handlePaginationChange"
        >
        </crud-footer>
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
