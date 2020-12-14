<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">特殊列
      <example-helper title="帮助"  >
        <h4>请点击右下角查看本页源码</h4>
      </example-helper>

    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
        @customHandleBtn="customHandleBtnHandle"
    >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

        <el-button-group >
          <el-button   size="small" type="primary" @click="addRow"><i class="el-icon-plus"></i> 新增</el-button>
          <el-button   size="small" type="danger" @click="batchDelete"><i class="el-icon-delete"></i> 批量删除</el-button>
          <el-button   size="small" type="primary" @click="checkSecond">选中第一、二行</el-button>

        </el-button-group>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"  />
      </div>

      <template slot="expandSlot" slot-scope="scope">
        这里显示行展开数据:{{scope.row.data}}
      </template>

    </d2-crud-x>
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
  async mounted () {
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    async pageRequest (query) {
      const ret = await GetList(query)
      // 修复合计行错位问题
      await this.$nextTick() // 等待加载完成后触发重排布局
      this.getD2CrudTable().store.scheduleLayout()
      return ret
    },
    addRequest (row) {
      return AddObj(row)
    },
    async updateRequest (row) {
      await UpdateObj(row)
      this.reloadTreeChildren(row.parentId)
    },
    async delRequest (row) {
      await DelObj(row.id)
      this.reloadTreeChildren(row.parentId)
    },
    reloadTreeChildren (parentId) {
      const data = this.getD2Crud().$refs.elTable.store.states.treeData
      if (data != null) {
        const item = data[parentId]
        if (item != null) {
          item.loaded = false
          item.expanded = false
        }
      }
    },
    batchDelRequest (ids) {
      return BatchDel(ids)
    },
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.$message('单选' + currentRow.data)
    },
    customHandleBtnHandle ({ index, row }) {
      this.$message('自定义操作按钮：' + row.data)
    },
    checkSecond () {
      this.getD2CrudTable().toggleRowSelection(this.getD2CrudTableData()[0]) // 跟下面等效
      this.getD2Crud().$refs.elTable.toggleRowSelection(this.getD2Crud().d2CrudData[1])
    }
  }
}
</script>
