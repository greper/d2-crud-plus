<template>
  <d2-container :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">
      前端分页
      <example-helper title="前端分页" >
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
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'formLocalPagination',
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      tableData: undefined,
      doFirstRequest: false
    }
  },
  created () {
    GetList().then(ret => { // 获取全部数据
      this.tableData = ret.data.records
      if (this.doFirstRequest) {
        this.doRefresh()
      }
    })
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      let data = this.tableData
      if (data == null) { // 第一次加载的时候 ，获取全部数据的请求还没有返回，先return，等请求完成后再刷新一次
        this.doFirstRequest = true
        return
      }
      const size = query.size
      let current = query.current
      data = data.filter(item => {
        // 前端搜索过滤
        if (query.text && item.text.indexOf(query.text) < 0) {
          return false
        }
        return true
      })
      return new Promise((resolve, reject) => {
        const start = size * (current - 1)
        let end = size * current
        if (data.length < end) {
          end = data.length
        }
        const records = data.slice(start, end) // 本地分页

        const maxPage = data.length % size === 0 ? data.length / size : Math.floor(data.length / size) + 1
        if (current > maxPage) {
          current = maxPage
        }
        if (current < 1) {
          current = 1
        }
        // 构造返回数据
        const ret = {
          code: 0,
          msg: 'success',
          data: {
            current,
            size,
            total: this.tableData.length,
            records
          }
        }
        resolve(ret)
      })
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
