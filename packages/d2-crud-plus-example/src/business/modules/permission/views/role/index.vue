<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">角色管理
          <example-helper title="权限管理帮助" >
            <div>
              <link-button href="http://greper.gitee.io/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
            </div>
          </example-helper>
        </template>
        <d2-crud
                ref="d2Crud"
                size="mini"
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
                :pagination="crud.pagination"
                @pagination-change="handlePaginationChange"
                @dialog-open="handleDialogOpen"
                @row-edit="handleRowEdit"
                @row-add="handleRowAdd"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @form-data-change="handleFormDataChange"
                @authz="authzHandle"
        >
            <div slot="header" class="d2-mb-5">

            </div>

          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <platform-selector size="small" @change="platformChanged" @init="platformInit"></platform-selector>
            <el-button v-permission="'permission:role:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud>

        <el-dialog title="分配权限"
                   :visible.sync="dialogPermissionVisible">
            <el-tree class="filter-tree"
                     :data="treeData"
                     :default-checked-keys="checkedKeys"
                     :check-strictly="false"
                     node-key="id"
                     highlight-current
                     :props="{label: 'title', value: 'id'}"
                     show-checkbox
                     ref="menuTree"
                     default-expand-all>
            </el-tree>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="updatePermession(roleId)">更 新
                </el-button>
            </div>
        </el-dialog>

    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj, GetPermission, DoAuthz } from './api'
import { GetTree } from '../resource/api'
import PlatformSelector from '../../component/platform-selector'
export default {
  name: 'Role',
  mixins: [d2CrudPlus.crud],
  components: { PlatformSelector },
  data () {
    return {
      platformId: 1,
      dsScopeData: [],
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      menuIds: '',
      list: [],
      listLoading: true,
      form: {},
      roleId: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false
    }
  },
  methods: {
    initAfter () {
      // 检查权限
      if (!this.hasPermissions('permission:role:edit')) {
        this.crud.rowHandle.edit.disabled = true
        //  delete this.crud.rowHandle.edit  // 也可以隐藏不显示
      }
      if (!this.hasPermissions('permission:role:del')) {
        this.crud.rowHandle.remove.disabled = true
        //  delete this.crud.rowHandle.remove  // 也可以隐藏不显示
      }
      if (!this.hasPermissions('permission:role:authz')) {
        this.crud.rowHandle.custom[0].disabled = true
        // delete this.crud.rowHandle.custom // 也可以隐藏不显示
      }
    },
    doLoad () {
    // 打开页面不加载，等平台列表加载完了再刷新列表
    },
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
    },
    platformInit (platformId) {
      this.platformId = platformId
      this.getSearch().setForm({ platformId }, true)
      this.getSearch().doSearch()
    },
    platformChanged (platformId) {
      this.platformInit(platformId)
    },
    // 如果勾选节点中存在非叶子节点，tree组件会将其所有子节点全部勾选
    // 所以要找出所有叶子节点，仅勾选叶子节点，tree组件会将父节点同步勾选
    getAllCheckedLeafNodeId (tree, checkedIds, temp) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        if (item.children && item.children.length !== 0) {
          this.getAllCheckedLeafNodeId(item.children, checkedIds, temp)
        } else {
          if (checkedIds.indexOf(item.id) !== -1) {
            temp.push(item.id)
          }
        }
      }
      return temp
    },
    authzHandle (event) {
      console.log('authz', event)

      GetTree({ platformId: this.platformId }).then(ret => {
        this.$set(this, 'treeData', ret.data)
        this.$set(this, 'checkedKeys', [])
        // this.treeData = ret.data
        this.roleId = event.row.id
        return this.updateChecked(event.row.id)
      }).then(() => {
        this.dialogPermissionVisible = true
      })
    },
    updateChecked (id) {
      return GetPermission(id).then(ret => {
        let checkedIds = ret.data
        // 找出所有的叶子节点
        checkedIds = this.getAllCheckedLeafNodeId(this.treeData, checkedIds, [])
        console.log('all leaf ', checkedIds)
        this.$set(this, 'checkedKeys', checkedIds)
        // this.$nextTick(() => {
        //   this.$refs.menuTree.setCheckedKeys(checkedIds)
        // })
      })
    },
    updatePermession (roleId) {
      this.menuIds = this.$refs.menuTree.getCheckedKeys().concat(this.$refs.menuTree.getHalfCheckedKeys())
      DoAuthz(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        this.updateChecked(roleId)
      })
    }
  }
}
</script>
