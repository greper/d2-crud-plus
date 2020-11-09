<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">日期选择</template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"  />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  name: 'formDate',
  mixins: [d2CrudPlus.crud],
  mounted () {
    // 获取数据推迟到 mounted之后
    this.doRefresh()
  },
  methods: {
    doLoad () {

    },
    getCrudOptions () {
      return crudOptions
    },
    async pageRequest (query) {
      const ret = await GetList(query)
      // 需要3次nextTick el-table才能最终完成初始化
      this.$nextTick().then(async () => {
        await this.$nextTick()
        const tableData = this.getD2CrudTableData()
        console.log('tableData:', tableData)
      })
      return ret
    },
    addRequest (row) {
      this.beforeSave(row)
      return AddObj(row)
    },
    updateRequest (row) {
      this.beforeSave(row)
      return UpdateObj(row)
    },
    /**
     * 在发起请求前，将日期范围选择器中的结果放到row的start和end中去
     * @param row
     * @returns {*}
     */
    beforeSave (row) {
      return row
    },
    /**
     * 在打开对话框之前，将start和end的时间范围改成数组放到一个字段里去
     * @param opt
     */
    handleDialogOpen (opt) {
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
