<template>
  <d2-container>
    <template slot="header">特殊列
      <example-helper title="帮助"  >
        <h4>请点击右下角查看本页源码</h4>
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
        :indexRow="crud.indexRow"
        :selectionRow="crud.selectionRow"
        :expandRow="crud.expandRow"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel"
        @form-data-change="handleFormDataChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        @customHandleBtn="customHandleBtnHandle"
    >
      <el-button-group slot="header" style="margin-bottom: 5px">
        <el-button   size="small" type="primary" @click="addRow"><i class="el-icon-plus"></i> 新增</el-button>
        <el-button   size="small" type="danger" @click="batchDelete"><i class="el-icon-delete"></i> 批量删除</el-button>
      </el-button-group>
      <template slot="expandSlot" slot-scope="scope">
        这里显示行展开数据:{{scope.row.data}}
      </template>

    </d2-crud>
    <crud-footer ref="footer" :current="crud.page.current"
                  :size="crud.page.size"
                  :total="crud.page.total"
                  @change="handlePaginationChange"
    >
    </crud-footer>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj, BatchDel } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import helper from './helper'
export default {
  name: 'formColumn',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      helper: helper,
      multipleSelection: undefined
    }
  },
  computed: {
  },
  methods: {
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
      return DelObj(row.id).then(ret => {
        // 手动更新加载项
        let data = this.getD2Crud().$refs.elTable['store'].states.treeData
        if (data != null) {
          let item = data[row.parentId]
          console.log('tree Data', data, item, row.id)
          if (item != null) {
            item.loaded = false
            item.expanded = false
          }
        }
        return ret
      })
    },
    batchDelRequest (ids) {
      return BatchDel(ids)
    },
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.$message('单选' + currentRow.data)
    },
    customHandleBtnHandle ({ index, row }) {
      this.$message('自定义操作按钮：' + row.data)
    }
  }
}
</script>
