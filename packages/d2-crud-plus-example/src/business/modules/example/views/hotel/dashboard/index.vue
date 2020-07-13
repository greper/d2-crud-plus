<template >
  <d2-container class="page">
    <div class="header d2-mb-10">
      <el-radio-group v-model="currentType" @change="roomTypeChanged">
        <el-radio-button   type="primary" :value="null"  >全部</el-radio-button>
        <el-radio-button v-for="(item) in roomTypes" :key="item.value"  type="primary"  :label="item.value"  >{{item.label}}</el-radio-button>
      </el-radio-group>

      <div style="float:right">
      <el-tag class="d2-ml-10" v-for="item in roomStatusDict.data" :key="item.value" :type="item.color">{{item.label}}</el-tag>
      </div>
    </div>
    <d2-crud-x
            ref="d2Crud"
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
            :loading="crud.loading"
            selection-row
            @selection-change="handleSelectionChange"
            @dialog-open="handleDialogOpen"
            @row-edit="handleRowEdit"
            @row-add="handleRowAdd"
            @row-remove="handleRowRemove"
            @dialog-cancel="handleDialogCancel"
            @form-data-change="handleFormDataChange"
    >
      <template slot="body">
        <div class="main">
          <el-row :gutter="10">
            <el-col :span="3" v-for="item in rooms" :key="item.room.id" class="d2-mb-10">
              <div :class="'card bg-'+item.statusColor" shadow="hover" style="height:120px;" >
                <div class="d2-mb-5">
                  <div>
                    <el-button v-if="item.room.status>2" size="small" :type="item.statusColor">
                      {{item.room.name}}房
                    </el-button>
                    <el-dropdown  v-else type="primary"  size="small" @command="doCheckInOper(item,$event)">
                      <el-button type="primary" size="small">
                        {{item.room.name}}房<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu  slot="dropdown">
                        <el-dropdown-item command="add" >入住登记</el-dropdown-item>
                        <el-dropdown-item command="edit">调整时间</el-dropdown-item>
                        <el-dropdown-item command="checkOut">提前离店</el-dropdown-item>
                        <el-dropdown-item command="del">删除入住</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <values-format  style="float:right" v-model="item.room.roomType" :dict="roomTypeDict"></values-format>
                  </div>
                </div>
                <div class="text"  v-if="item.status>2" style="display: flex;">
                  <div v-if="item.status ===3 ">故障</div>
                  <div v-if="item.status ===4 ">停用</div>
                </div>
                <div  class="text" v-else-if="item.checkIn!=null">
                  <div>姓名：{{item.checkIn.guestName}}</div>
                  <div>手机：{{item.checkIn.mobile}}</div>
                  <div>入住：{{item.checkIn.checkInTime|date_dateline('YYYY-MM-DD HH:mm','HH:mm')}}</div>
                  <div>离店：{{item.checkIn.checkOutTime|date_dateline('YYYY-MM-DD HH:mm','HH:mm')}}</div>
                  <div>天数：{{item.checkIn.dayCount}}天</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </d2-crud-x>
  </d2-container>
</template>

<script>
import { GetRoomList } from './api'
import checkInCrudEditMixin from '../room/checkin/crud-edit-mixin'
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'hotelDashboard',
  components: {
  },
  mixins: [checkInCrudEditMixin],
  data () {
    return {
      roomTypes: [],
      roomStatuses: {},
      currentType: null,
      rooms: [],
      roomTypeDict: {
        url: '/hotel/roomtype/options'
      },
      roomStatusDict: {
        url: '/hotel/dicts/RoomStatusEnum'
      }
    }
  },
  created () {
    d2CrudPlus.util.dict.get(this.roomTypeDict).then((data) => {
      this.roomTypes = data
    })
    d2CrudPlus.util.dict.get(this.roomStatusDict).then((data) => {
      console.log('roomStatusDict:', data)
      for (const item of data) {
        this.roomStatuses[item.value] = item
      }
      this.$set(this.roomStatusDict, 'data', data)
      this.loadData()
    })
  },
  methods: {
    afterInit () {
      this.crud.options.hide = true
    },
    roomTypeChanged ($event) {
      console.log('roomTypeChanged', $event)
      this.currentType = $event
      this.loadData()
    },
    loadData () {
      GetRoomList(this.currentType).then((ret) => {
        for (const item of ret.data) {
          const status = this.roomStatuses[item.status]
          if (status != null) {
            item.statusColor = status.color
          } else {
            item.statusColor = ''
          }
        }
        console.log('index rooms:', ret.data, this.roomStatuses)
        this.$set(this, 'rooms', ret.data)
      })
    },
    doLoad () {
      // 不要执行
    },
    doCheckInOper (item, cmd) {
      if (cmd === 'add') {
        this.addCheckIn(item)
        return
      }
      if (item.checkIn == null) {
        this.$message.warning('该房间还没有入住信息')
        return
      }
      if (cmd === 'edit') {
        this.editCheckIn(item.checkIn)
      } else if (cmd === 'del') {
        this.delCheckIn(item.checkIn)
      } else if (cmd === 'checkOut') {
        this.doCheckOut(item.checkIn)
      }
    },
    addCheckIn (item) {
      this.crud.addTemplate.roomId.value = item.room.id
      console.log('addTemplate:', this.crud.addTemplate)
      this.$refs.d2Crud.handleAdd(this.crud.addTemplate)
    },
    editCheckIn (checkIn) {
      this.$refs.d2Crud.handleEdit(0, checkIn)
    },
    delCheckIn (checkIn) {
      this.$refs.d2Crud.handleRemove(0, checkIn)
    },
    doRefresh () {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
  /**
     EMPTY(0,"空房","primary"),
      OCCUPY(1,"住客","success"),
      BOOKED(2,"预定","warning"),
      FAULT(3,"故障","info"),
      DISABLED(4,"停用","danger");
     */
  .main{
    .el-button--small, .el-button--small.is-round {
      padding: 9px 9px;
    }
    .text{
      font-size: 13px;
    }
    .card{
      border: 1px solid;
      /*color: #fff;*/
      -webkit-transition: .3s;
      transition: .3s;
      border-radius: 4px;
      overflow: hidden;
      padding:10px;
    }
    .type-primary{
      background-color: rgba(82, 255, 236, 0.5);
    }
    .type-danger{
      background-color: rgba(255, 48, 68, 0.5);
    }
    .type-info{
      background-color: rgba(49, 49, 49, 0.5);
    }
    .type-warning{
      background-color: rgba(205, 191, 55, 0.5);
    }
    .type-success{
      background-color: rgba(53, 205, 79, 0.5);
    }
  }
</style>
