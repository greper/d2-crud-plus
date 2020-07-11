<template>
  <d2-container>
    <template slot="header">
      <div>动态添加表单字段</div>
      <example-helper title="自定义组件帮助说明" >
          <div>
           右下角查看源码
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
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange">

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button  class="d2-mb-5" size="small" type="primary" @click="addRow">新增</el-button>
        <crud-toolbar
                      :search.sync="crud.searchOptions.disabled"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>

      <template slot="FormBodyAppendSlot" slot-scope="scope">
        <div class="d2-mt-10">
          <el-button @click="addColumn(scope)">添加未分组字段</el-button>
          <el-button @click="addGroupColumn(scope)">添加分组字段</el-button>
          <el-button @click="addGroup(scope)">添加分组</el-button>
          <el-button @click="configText(scope)">修改字段配置</el-button>
        </div>
      </template>

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
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formAddi',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    reComputeCrudHeight () {

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
    addColumn (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const column = {
        title: '动态添加',
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      this.$set(this.getEditFormTemplate(), key, column)
      this.$set(this.getEditForm(), key, undefined)
      console.log('add', this.getEditFormTemplate(), this.getEditForm())
    },
    addGroup (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const groupKey = 'group' + Math.floor(Math.random() * 1000)
      const group = {
        title: '动态添加分组',
        columns: {}
      }
      group.columns[groupKey] = {
        title: '动态添加',
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      const groups = this.getEditFormTemplateGroup()
      this.$set(groups, groupKey, group)
      this.$set(this.getEditForm(), key, undefined)
      this.getD2Crud().formGroupsActive.push(groupKey)
      console.log('add group:', this.getEditFormTemplateGroup(), this.getEditForm())
    },
    addGroupColumn (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const column = {
        title: '动态添加',
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      const groupColumns = this.getEditFormTemplateGroup('test')
      this.$set(groupColumns, key, column)
      this.$set(this.getEditForm(), key, undefined)
      console.log('add', this.getEditFormTemplate(), this.getEditForm())
    },
    configText (scope) {
      const template = this.getEditFormTemplate('text')
      template.component = {
        name: 'dict-select',
        props: {
          dict: { value: 'value', label: 'label', data: [{ value: '1', label: '打开' }, { value: '0', label: '关闭' }] }
        },
        span: 12
      }
    }
  }
}
</script>
<style>
.d2-crud{
  height:100%;
}
.d2-crud .d2-crud-body{
    height:100%;
    padding:0px
  }
</style>
