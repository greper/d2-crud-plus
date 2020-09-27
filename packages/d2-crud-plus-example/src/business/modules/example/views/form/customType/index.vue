<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">自定义字段类型
      <example-helper title="帮助说明" >
        <link-button href="http://greper.gitee.io/d2-crud-plus/guide/column-type.html#自定义字段类型">自定义字段类型</link-button>
        <link-button href="http://greper.gitee.io/d2-crud-plus/guide/extends.html">自定义扩展</link-button>
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
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"  />
      </div>

    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formCustomType',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  computed: {
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
    }
  }
}
</script>
