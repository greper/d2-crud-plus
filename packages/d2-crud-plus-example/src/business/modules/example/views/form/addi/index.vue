<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      动态添加表单字段
      <example-helper title="自定义组件帮助说明" >
          <div>
           右下角查看源码
          </div>
      </example-helper>
    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners">

      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
      </div>

      <template slot="FormBodyAppendSlot" slot-scope="scope">
        <div class="d2-mt-10" v-if="scope.mode!=='view'">
          <el-button @click="addColumn(scope)">添加未分组字段</el-button>
          <el-button @click="addGroupColumn(scope)">添加分组字段</el-button>
          <el-button @click="addGroup(scope)">添加新分组</el-button>
          <el-button @click="configText(scope)">修改字段配置</el-button>
        </div>
      </template>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formAddi',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  methods: {
    reComputeCrudHeight () {

    },
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
    addIndex () {
      if (this.addIndexValue == null) {
        this.addIndexValue = 0
      }
      this.addIndexValue++
      return this.addIndexValue
    },
    addColumn (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const column = {
        title: '动态添加' + this.addIndex(),
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      this.$set(this.getEditFormTemplate(), key, column)
      this.$set(this.getEditForm(), key, undefined)
      console.log('add', this.getEditFormTemplate(), this.getEditForm())
    },
    addGroup (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const groupKey = 'group' + Math.floor(Math.random() * 1000)
      const group = {
        title: '动态添加分组' + this.addIndex(),
        columns: {}
      }
      group.columns[groupKey] = {
        title: '动态添加' + this.addIndex(),
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      const groups = this.getEditFormTemplateGroup()
      this.$set(groups, groupKey, group)
      this.$set(this.getEditForm(), key, undefined)
      this.getD2Crud().formGroupsActive.push(groupKey)
      console.log('add group:', this.getEditFormTemplateGroup(), this.getEditForm())
    },
    addGroupColumn (scope) {
      const key = 'add' + Math.floor(Math.random() * 1000)
      const column = {
        title: '动态添加' + this.addIndex(),
        ket: key,
        component: {
          name: 'dict-select',
          props: {
            dict: { url: '/dicts/OpenStatusEnum' }
          },
          span: 12
        }
      }
      const groupColumns = this.getEditFormTemplateGroup('test')
      this.$set(groupColumns, key, column)
      this.$set(this.getEditForm(), key, undefined)
      console.log('add', this.getEditFormTemplate(), this.getEditForm())
    },
    configText (scope) {
      const template = this.getEditFormTemplate('text')
      template.component = {
        name: 'dict-select',
        props: {
          dict: { value: 'value', label: 'label', data: [{ value: '1', label: '打开' }, { value: '0', label: '关闭' }] }
        },
        span: 12
      }
    }
  }
}
</script>
