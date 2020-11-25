<template>
  <crud-container  :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      右上角工具条
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮，查看如何从旧版页面升级】</span>
      <example-helper title="帮助说明" >
        <div>本次升级，兼容旧版本。旧版本不做任何更改可以继续使用</div>
        <br/>
        <div>支持版本：d2-crud-x:1.12.x，d2-crud-x:2.5.x 及以上</div>
        <br/>
        <div>
          从旧版本升级，请按如下修改：
          <ul>
            <li>引入方式：Vue.use(d2CrudX, { name: 'd2-crud-x' })</li>
            <li>【必须配置】crud.options.height:'100%' </li>
            <li>&lt;crud-search /&gt;组件放到d2-crud的header里面去</li>
            <li>删除'&lt; crud-footer /&gt;翻页组件，采用d2-crud内置pagination</li>
            <li>&lt;d2-crud&gt;增加属性 :pagination="crud.pagination"</li>
            <li>&lt;d2-crud&gt;增加事件@pagination-change="handlePaginationChange"</li>
            <li>&lt;d2-container :class="{'page-compact':crud.pageOptions.compact}"&gt;</li>
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

        <el-button size="small" type="primary" @click="dynamicColumns"><i class="el-icon-plus"/> 动态修改列测试</el-button>

        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
      </div>
    </d2-crud-x>
  </crud-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formToolbar',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
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
    },
    dynamicColumns () {
      if (this.columnsBak == null) {
        this.columnsBak = this.crud.columns
        this.crud.columns = [{ title: '测试', key: 'test', show: true }]
      } else {
        this.crud.columns = this.columnsBak
        this.columnsBak = null
      }
    }
  }
}
</script>
