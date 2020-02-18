<template>
    <d2-container>
        <template slot="header">角色管理</template>
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" ></crud-search>
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
                @dialog-open="handleDialogOpen"
                @row-edit="handleRowEdit"
                @row-add="handleRowAdd"
                @row-remove="handleRowRemove"
                @dialog-cancel="handleDialogCancel"
                @form-data-change="handleFormDataChange"
                @authz="authzHandle"
        >
            <el-button slot="header" class="d2-mb-5" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>
        </d2-crud>
        <crud-footer ref="footer" slot="footer"
                     :current="crud.page.current"
                     :size="crud.page.size"
                     :total="crud.page.total"
                     @change="handlePaginationChange"
        >
        </crud-footer>

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
    /**
       * 找出所有已选择的叶子节点
       * @param json 待解析的json串
       * @param idArr 原始节点数组
       * @param temp 临时存放节点id的数组
       * @return 太监节点id数组
       */
    getAllCheckedLeafNodeId (tree, checkedIds, temp) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        // 存在子节点，递归遍历;不存在子节点，将
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
      GetTree({}).then(ret => {
        this.treeData = ret.data
        this.roleId = event.row.id
        this.dialogPermissionVisible = true
        return this.updateChecked(event.row.id)
      }).then(() => {

      })
    },
    updateChecked (id) {
      return GetPermission(id).then(ret => {
        let checkedIds = ret.data
        // 找出所有的叶子节点
        checkedIds = this.getAllCheckedLeafNodeId(this.treeData, checkedIds, [])
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
