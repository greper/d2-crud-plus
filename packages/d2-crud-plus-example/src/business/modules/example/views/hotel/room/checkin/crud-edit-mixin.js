import { crudOptions } from './crud'
import { AddObj, UpdateObj, DelObj, DoCheckOut } from './api'
import { d2CrudPlus } from 'd2-crud-plus'

export default {
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  created () {
    this.initColumns()
    this.afterInit()
  },
  methods: {
    afterInit () {
    },
    getCrudOptions () {
      return crudOptions
    },
    addRequest (row) {
      this.beforeRequest(row)
      return AddObj(row)
    },
    updateRequest (row) {
      this.beforeRequest(row)
      return UpdateObj(row)
    },
    beforeRequest (row) {
      let checkInRange = row.checkInRange // 一个date数组
      if (checkInRange != null && checkInRange.length >= 2) {
        row.checkInTime = checkInRange[0].getTime()
        row.checkOutTime = checkInRange[1].getTime()
      }
    },
    delRequest (row) {
      return DelObj(row.id)
    },
    handleDialogOpen (opt) {
    //  console.log('handleDialogOpen', mode, row)
      if (opt.row != null) {
        opt.row.checkInRange = [new Date(opt.row.checkInTime), new Date(opt.row.checkOutTime)]
      }
    },
    doCheckOut (checkIn) {
      this.$confirm('确定设置该客户离店吗？', '离店', {
        type: 'warning'
      }).then(() => {
        return DoCheckOut(checkIn.id)
      }).then(() => {
        this.doRefresh()
      }).catch(() => {})
    }
  }
}
