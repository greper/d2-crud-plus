<template>
  <d2-container>
    <template slot="header">禁用与启用
      <example-helper title="select" >
        <div>
          右下角查看源码
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
        @dialog-opened="handleDialogOpened"
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
    },
    /**
     * 编辑对话框打开之后的事件，需要配置 @dialog-opened
     * @param mode 模式 edit / add
     * @param row 行数据
     * @param form 表单数据
     * @param template 字段配置
     * @param groupTemplate 字段分组配置
     */
    handleDialogOpened ({ mode, row, form, template, groupTemplate }) {
      // 在对话框打开的时候，调用一下disableText3 的valueChange方法，使禁用效果一致
      this.getEditFormTemplate('disableText3').valueChange('disableText3', form.disableText3, form)
    }
  }
}
</script>
