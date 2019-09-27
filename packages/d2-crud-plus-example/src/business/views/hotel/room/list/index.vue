<template>
  <d2-container>
<!--    <template slot="header">房间管理</template>-->
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" ></crud-search>
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
        highlightCurrentRow
        selection-row
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel">
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
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { AddRoom, GetRoomList, UpdateRoom, DelRoom } from './api'
export default {
  name: 'roomList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  created () {
    this.initColumns()
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      return GetRoomList(query)
    },
    addRequest (row) {
      return AddRoom(row)
    },
    updateRequest (row) {
      return UpdateRoom(row)
    },
    delRequest (row) {
      return DelRoom(row.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  div.d2-crud .d2-crud-body{
    padding-top:0 !important;
  }
</style>
