<template>
  <d2-container>
    <template slot="header">d2crud官方原版
      <span style="color:gray;font-size: 12px">【官方版已久不维护，建议使用d2-crud-x】</span>
      <example-helper title="d2crud共存" >
          <div>
           同一个项目里面可以d2-crud-x 与 d2-crud共存。
          </div>
        <div>
          给使用d2Crud开发完成一些功能的项目的使用d2cCrudPlus的解决方案
        </div>
      </example-helper>
    </template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
    <d2-crud-o
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
        @form-data-change="handleFormDataChange">
      <el-button slot="header" class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>

      <template slot="FormBodyAppendSlot" slot-scope="scope">
        <div class="d2-mt-10">
          <el-button @click="addColumn(scope)">添加未分组字段</el-button>
          <el-button @click="addGroupColumn(scope)">添加分组字段</el-button>
          <el-button @click="addGroup(scope)">添加分组</el-button>
          <el-button @click="configText(scope)">修改字段配置</el-button>
        </div>
      </template>

    </d2-crud-o>
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
import d2Crud from '@d2-projects/d2-crud'
export default {
  name: 'formAddi',
  components: { 'd2-crud-o': d2Crud },
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
