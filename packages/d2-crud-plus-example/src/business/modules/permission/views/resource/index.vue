<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">资源管理
      <example-helper title="权限管理帮助" >
        <div>
          <h3>如何启用权限管理，请点击下面帮助链接</h3>
          <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
        </div>
      </example-helper>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @add-sub-resource="handleAddSubResource"
    >

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button slot="header"  v-permission="'permission:resource:add'" size="small" type="primary" @click="addRootRow"><i class="el-icon-plus"/> 新增</el-button>

        <crud-toolbar :search.sync="crud.searchOptions.show"
                      :compact.sync="crud.pageOptions.compact"
                      :columns="crud.columns"
                      @refresh="doRefresh()"
                      @columns-filter-changed="handleColumnsFilterChanged"/>
      </div>

    </d2-crud-x>
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
    async pageRequest (query) {
      const ret = await GetTree(query)
      const list = ret.data
      ret.data = {
        current: 1,
        size: 10000,
        total: 100,
        records: list
      }
      this.$nextTick(async () => {
        await this.$nextTick() // 多等一次
        const data = this.getD2Crud().$refs.elTable.store.states.treeData
        if (data != null) {
          foreach(data, (value, key) => {
            // 默认展开两层
            if (value.children && value.level <= 1) {
              value.expanded = true
            }
          })
        }
        await this.$nextTick()
        this.getD2CrudTable().doLayout()
      })
      return ret
    },
    clearResourceTreeDictCache () {
      d2CrudPlus.util.dict.clear('/permission/manager/resource/tree')
    },
    addRequest (row) {
      this.clearResourceTreeDictCache()
      return AddObj(row)
    },
    updateRequest (row) {
      this.clearResourceTreeDictCache()
      return UpdateObj(row)
    },
    delRequest (row) {
      this.clearResourceTreeDictCache()
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
