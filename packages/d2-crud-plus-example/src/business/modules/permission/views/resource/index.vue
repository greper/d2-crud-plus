<template>
    <d2-container>
        <template slot="header">菜单管理</template>
        <div>
        <el-button-group>
            <el-button type="primary"
                       icon="plus"
                       @click="handlerAdd">添加
            </el-button>
            <el-button type="primary"
                       icon="edit"
                       @click="handlerEdit">编辑
            </el-button>
            <el-button type="primary"
                       icon="delete"
                       @click="handleDelete">删除
            </el-button>
        </el-button-group>
        </div>

        <el-row>
            <el-col :span="8"
                    style='margin-top:15px;'>
                <el-tree class="filter-tree"
                         node-key="id"
                         highlight-current
                         :data="treeData"
                         :default-expanded-keys="aExpandedKeys"
                         :filter-node-method="filterNode"
                         :props="defaultProps"
                         @node-click="getNodeData"
                         @node-expand="nodeExpand"
                         @node-collapse="nodeCollapse">
                </el-tree>
            </el-col>
            <el-col :span="16"
                    style='margin-top:15px;'>
                <el-card class="box-card">
                    <el-form :label-position="labelPosition"
                             label-width="80px"
                             :model="form"
                             ref="form">
                        <el-form-item label="父级节点"
                                      prop="parentId">
                            <el-input v-model="form.parentId"
                                      :disabled="true"
                                      placeholder="请输入父级节点"></el-input>
                        </el-form-item>
                        <el-form-item label="节点ID"
                                      prop="id">
                            <el-input v-model="form.id"
                                      :disabled="true"
                                      placeholder="请输入节点ID"></el-input>
                        </el-form-item>
                        <el-form-item label="标题"
                                      prop="title">
                            <el-input v-model="form.title"
                                      :disabled="formEdit"
                                      placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item label="名称"
                                      prop="name">
                            <el-input v-model="form.name"
                                      :disabled="formEdit"
                                      placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item label="权限标识"
                                      prop="permission">
                            <el-input v-model="form.permission"
                                      :disabled="formEdit"
                                      placeholder="请输入权限标识"></el-input>
                        </el-form-item>
                        <el-form-item label="图标"
                                      prop="icon">
                            <el-input v-model="form.icon"
                                      :disabled="formEdit"
                                      placeholder="请输入图标"></el-input>
                        </el-form-item>
                        <el-form-item label="类型"
                                      prop="type">
                            <el-select class="filter-item"
                                       v-model="form.type"
                                       :disabled="formEdit"
                                       placeholder="请输入资源请求类型">
                                <el-option v-for="item in  typeOptions"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="排序"
                                      prop="sort">
                            <el-input type="number"
                                      v-model="form.sort"
                                      :disabled="formEdit"
                                      placeholder="请输入排序"></el-input>
                        </el-form-item>
                        <el-form-item label="前端组件"
                                      prop="component">
                            <el-input v-model="form.component"
                                      :disabled="formEdit"
                                      placeholder="请输入组件路径"></el-input>
                        </el-form-item>
                        <el-form-item label="前端地址"
                                      prop="path">
                            <el-input v-model="form.path"
                                      :disabled="formEdit"
                                      placeholder="url地址"></el-input>
                        </el-form-item>
                        <el-form-item v-if="formStatus == 'update'">
                            <el-button type="primary"
                                       @click="update">更新
                            </el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                        <el-form-item v-if="formStatus == 'create'">
                            <el-button type="primary"
                                       @click="create">保存
                            </el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
import { GetList, AddObj, UpdateObj, DelObj, GetTree, GetObj } from './api'
export default {
  name: 'Resource',
  data () {
    return {
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: [],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      listQuery: {
        name: undefined
      },
      dict: { url: '/base/dicts/ResourceTypeEnum' },
      treeData: [],
      oExpandedKey: {
        // key (from tree id) : expandedOrNot boolean
      },
      oTreeNodeChildren: {
        // id1 : [children] (from tree node id1)
        // id2 : [children] (from tree node id2)
      },
      aExpandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        permission: undefined,
        name: undefined,
        id: undefined,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined
      },
      currentId: 0,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        0: '菜单',
        1: '按钮'
      }
      return typeMap[type]
    }
  },
  created () {
    this.getTree()
    d2CrudPlus.util.dict.get(this.dict).then(data => {
      this.typeOptions = data
    })
  },
  methods: {
    getTree () {
      this.treeRequest({}).then(ret => {
        this.treeData = ret.data
      })
    },

    pageRequest (query) {
      return GetList(query)
    },
    treeRequest (query) {
      return GetTree(query)
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
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    nodeExpand (data) {
      let aChildren = data.children
      if (aChildren.length > 0) {
        this.oExpandedKey[data.id] = true
        this.oTreeNodeChildren[data.id] = aChildren
      }
      this.setExpandedKeys()
    },
    nodeCollapse (data) {
      this.oExpandedKey[data.id] = false
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], (oNode) => {
        this.oExpandedKey[oNode.id] = false
      })
      this.setExpandedKeys()
    },
    setExpandedKeys () {
      let oTemp = this.oExpandedKey
      this.aExpandedKeys = []
      for (let sKey in oTemp) {
        if (oTemp[sKey]) {
          this.aExpandedKeys.push(parseInt(sKey))
        }
      }
    },
    treeRecursion (aChildren, fnCallback) {
      if (aChildren) {
        for (let i = 0; i < aChildren.length; ++i) {
          let oNode = aChildren[i]
          fnCallback && fnCallback(oNode)
          this.treeRecursion(oNode.children, fnCallback)
        }
      }
    },

    getNodeData (data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      GetObj(data.id).then(response => {
        this.form = response.data
      })
      this.currentId = data.id
      this.showElement = true
    },
    handlerEdit () {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd () {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelObj(this.currentId).then(() => {
          this.getTree()
          this.resetForm()
          this.onCancel()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    update () {
      UpdateObj(this.form).then(() => {
        this.getTree()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    create () {
      AddObj(this.form).then((ret) => {
        this.form.id = ret.data
        this.formStatus = 'update'
        this.getTree()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm () {
      this.form = {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: this.currentId,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined
      }
    }
  }
}
</script>
