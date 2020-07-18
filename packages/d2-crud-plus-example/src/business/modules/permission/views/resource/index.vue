<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">资源管理
      <example-helper title="权限管理帮助" >
        <div>
          <link-button href="http://greper.gitee.io/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
        </div>
      </example-helper>
    </template>
    <d2-crud-x
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

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

        <platform-selector slot="header" size="small" @change="platformChanged" @init="platformInit"></platform-selector>
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
import PlatformSelector from '../../component/platform-selector'
export default {
  name: 'Resource',
  mixins: [d2CrudPlus.crud],
  components: { PlatformSelector },
  data () {
    return {
      platformId: 1
    }
  },
  methods: {
    doLoad () {
      // 打开页面不加载，等平台列表加载完了再刷新列表
    },
    // 由平台选择组件触发列表查询
    platformInit (platformId) {
      this.platformId = platformId
      this.getSearch().setForm({ platformId }, true)
      this.getSearch().doSearch()
    },
    platformChanged (platformId) {
      this.platformInit(platformId)
    },
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
        }, 1)
        return ret
      })
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
      this.addRow({ parentId: row.id, platformId: row.platformId })
    },
    addRootRow () {
      this.addRow({ parentId: 0, platformId: this.platformId })
    }

  }
}
</script>
