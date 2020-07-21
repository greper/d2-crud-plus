<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">vxe-table测试
      <span style="color:gray;font-size: 12px">【性能确实比el-table要好,与<a href="#/demo/form/column">特殊列</a>对比可以明显感受】如何切换成vxe-table，请点击右边帮助----></span>
      <example-helper title="帮助"  >
        <h4>切换vxe-table方式很简单</h4>
        <p>1、 <a href="https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install">安装vex-table</a></p>
        <p>2、 配置crud.options.tableType='vxe-table'</p>
        <br/>
        <h4>目前为beta版，生产环境请谨慎使用</h4>
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
          <el-button   size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
          <el-button   size="small" type="primary" @click="checkSecond">选中第一、二行</el-button>

        </el-button-group>

        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="undefined"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

      <template slot="expandSlot" slot-scope="scope">
        这里显示行展开数据:{{scope.row.data}}
      </template>

      <span slot="PaginationPrefixSlot" class="prefix" >
        <el-button class="square" size="mini" title="批量删除"   @click="batchDelete" icon="el-icon-delete" :disabled="!multipleSelection || multipleSelection.length===0"  />
      </span>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj, BatchDel } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import helper from './helper'
export default {
  name: 'vxeColumn',
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
  mounted () {
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
      return DelObj(row.id)
    },
    batchDelRequest (ids) {
      return BatchDel(ids)
    },
    handleCurrentChange (event) {
      console.log('单选', event.row)
      this.$message('单选' + event.row.data)
    },
    customHandleBtnHandle ({ index, row }) {
      this.$message('自定义操作按钮：' + row.data)
    },
    checkSecond () {
      this.getD2CrudTable().toggleCheckboxRow(this.getD2CrudTableData()[0]) // 与下面等效
      this.getD2Crud().$refs.elTable.toggleCheckboxRow(this.getD2Crud().d2CrudData[1])
    }
  }
}
</script>
