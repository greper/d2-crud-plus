<template>
  <d2-container>
    <template slot="header">资源管理
      <example-helper title="权限管理帮助" >
        <div>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
        </div>
      </example-helper>
    </template>
<!--    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  ></crud-search>-->
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
      :expandRow="crud.expandRow"
      @dialog-open="handleDialogOpen"
      @row-edit="handleRowEdit"
      @row-add="handleRowAdd"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      @form-data-change="handleFormDataChange"
      @add-sub-resource="handleAddSubResource"
    >
      <el-button slot="header" class="d2-mb-5" v-permission="'permission:resource:add'" size="small" type="primary" @click="addRootRow">新增</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetTree, AddObj, UpdateObj, DelObj, GetObj } from './api'
import foreach from 'lodash.foreach'
export default {
  name: 'Resource',
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
      return GetTree(query).then(ret => {
        const list = ret.data
        ret.data = {
          current: 1,
          size: 10000,
          total: 100,
          records: list
        }
        setTimeout(() => {
          const data = this.getD2Crud().$refs.elTable.store.states.treeData
          if (data != null) {
            foreach(data, (value, key) => {
              // 默认展开两层
              if (value.children && value.level <= 1) {
                value.expanded = true
              }
            })
          }
          console.log('this', data, this.getD2Crud().$refs.elTable.store.states)
        }, 1)
        return ret
      })
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
    },
    handleAddSubResource ({ index, row }) {
      this.addRow({ parentId: row.id })
    },
    addRootRow () {
      this.addRow({ parentId: 0 })
    }

  }
}
</script>
