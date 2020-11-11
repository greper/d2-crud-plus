<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">角色管理
          <example-helper title="权限管理帮助" >
            <div>
              <h3>如何启用权限管理，请点击下面帮助链接</h3>
              <link-button href="http://d2-crud-plus.docmirror.cn/d2-crud-plus/guide/permission.html">权限管理帮助文档</link-button>
            </div>
          </example-helper>
        </template>
        <d2-crud-x
                ref="d2Crud"
                size="mini"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @authz="authzHandle"
        >
            <div slot="header" class="d2-mb-5">

            </div>

          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button v-permission="'permission:role:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud-x>

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
import * as api from './api'
import * as resourceApi from '../resource/api'
export default {
  name: 'Role',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
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
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
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

      resourceApi.GetTree().then(ret => {
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
      return api.GetPermission(id).then(ret => {
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
      api.DoAuthz(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        this.updateChecked(roleId)
      })
    }
  }
}
</script>
