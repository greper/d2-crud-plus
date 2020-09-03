export default `<template>
  <div>
    <d2-crud-x
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      doc,
      code,
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      rowHandle: {
        edit: {
          icon: 'el-icon-edit',
          text: '点我查看表单组件渲染',
          size: 'small',
          fixed: 'right'
        }
      },
      editTemplate: {
        date: {
          title: '日期',
          value: '',
          component: {
            name: 'el-date-picker',
            span: 12
          }
        },
        name: {
          title: '姓名',
          value: '',
          component: {
            name: 'el-select',
            // 建议使用 d2-crud-plus 带的 dict-select组件,看下面
            children (h) {
              const items = []
              items.push(<el-option value='王小虎'>王小虎</el-option>)
              items.push(<el-option value='王中虎'>王中虎</el-option>)
              items.push(<el-option value='王老虎'>王老虎</el-option>)
              return items
            },
            size: 'small'
            span: 12
          }
        },
        status: {
          title: '状态',
          value: '1', // 默认值
          component: {
            name: 'dict-select',
            props: {
              dict: {
                data: [
                  { value: '1', label: '开启' },
                  { value: '2', label: '关闭' },
                  { value: '3', label: '停止' }
                ]
              }
            },
            span: 12
          }
        },
        address: {
          title: '地址',
          value: '',
          component: {
            span: 18
          }
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 20
      }
    }
  },
  methods: {
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    }
  }
}
</script>`
