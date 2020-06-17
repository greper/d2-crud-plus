<template>
  <d2-container>
    <template slot="header">选择组件
      <example-helper title="select" >
        <div>
          <link-button type="text" target="_blank" href="http://greper.gitee.io/d2-crud-plus/guide/types.html#选择框">选择组件类型</link-button>
          <link-button type="text" href="http://greper.gitee.io/d2-crud-plus/guide/components/dict-select.html">DictSelect组件</link-button>
        </div>
      </example-helper>
    </template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  >
    </crud-search>
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
      <el-button slot="header" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>
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
  name: 'formSelect',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      show: true
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
    }
    // handleFormDialogOpened ({ event, form }) {
    //   console.log('form dialog opened')
    //   this.getEditFormTemplate('disableAll').valueChange('disableAll', form.disableAll, form)
    //   this.getEditFormTemplate('checkbox').valueChange('checkbox', form.checkbox, form)
    //   this.getEditFormTemplate('show').valueChange('show', form.show, form)
    // }
  }
}
</script>
