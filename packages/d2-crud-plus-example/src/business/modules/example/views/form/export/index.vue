<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      数据导出
      <span style="color:gray;font-size: 12px">【点击右边帮助按钮，查看如何开启导出功能】</span>
      <example-helper title="帮助说明" >
        <link-button href="http://greper.gitee.io/d2-crud-plus/guide/data-export.html">导出功能文档</link-button>
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
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
      </div>
    </d2-crud-x>
  </d2-container>
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
      openStatusDataMap: {}
    }
  },
  created () {
    // 获取数据字典， 文档请看《暴露的方法》
    this.getDictData({ url: '/dicts/OpenStatusEnum' }, { returnType: 'dataMap' }).then(dataMap => {
      console.log('数据字典 map:', dataMap)
      this.openStatusDataMap = dataMap
    })
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
