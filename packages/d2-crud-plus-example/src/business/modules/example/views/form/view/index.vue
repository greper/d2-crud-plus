<template>
  <d2-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      查看按钮
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮，查看如何从开启查看按钮】</span>
      <example-helper  >
        <h3>开启查看按钮步骤</h3>
        <div>
          <ul>
            <li>1、crudOptions:{viewOptions:{disabled:false}}，开启查看按钮</li>
            <li>1.1、如果d2-crud-x的属性配置没有使用v-bind="_crudProps"方式，那么还需要配置:viewTemplate="crud.viewTemplate"</li>
            <li>2、crudOptions:{viewOptions:{componentType:'form'}} ，配置组件按哪种方式显示【form=表单组件，row=行展示组件】</li>
            <li>3、crudOptions:{rowHandle:{view:{}}}，查看按钮样式配置</li>
            <li>4、column:{view:{}}，字段单独配置</li>
          </ul>
        </div>
      </example-helper>
    </template>
    <d2-crud-x
        ref="d2Crud"
        v-bind="_crudProps"
        v-on="_crudListeners"
    >
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
        <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
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
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formView',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      show: true
    }
  },
  mounted () {
    console.log('dict cache：', d2CrudPlus.util.dict.getCache())
  },
  methods: {
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
    }
  }
}
</script>
