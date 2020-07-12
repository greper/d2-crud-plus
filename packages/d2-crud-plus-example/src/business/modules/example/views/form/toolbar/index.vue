<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      右上角工具条
      <example-helper title="帮助说明" >
        <div>
          从旧版本升级，请按如下修改：
          <ul>
            <li>【必须配置】crud.options.height:'100%' </li>
            <li>'&lt;crud-search /&gt;'组件放到d2-crud的header里面去</li>
            <li>删除'&lt; crud-footer /&gt;翻页组件，采用d2-crud内置pagination</li>
            <li>&lt;d2-crud&gt;增加属性 :pagination="crud.pagination"</li>
            <li>&lt;d2-crud&gt;增加事件@pagination-change="handlePaginationChange"</li>
            <li>&lt;d2-container :class="{'page-compact':crud.pageOptions.compact}"&gt;</li>
          </ul>
        </div>
      </example-helper>
    </template>
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
        :pagination="crud.pagination"
        @pagination-change="handlePaginationChange"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
        >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>
    </d2-crud>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formToolbar',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
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
  }
}
</script>
