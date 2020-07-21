const roomTypes = [
  { value: 1, label: '大床房', color: 'warning' },
  { value: 2, label: '双床房', color: 'primary' },
  { value: 3, label: '豪华双床房', color: 'success' },
  { value: 4, label: '豪华大床房', color: 'info' },
  { value: 10, label: '套房', color: 'info' }
]
const roomStatus = [
  { name: 'EMPTY', value: 0, label: '空房', color: 'primary' },
  { name: 'OCCUPY', value: 1, label: '住客', color: 'success' },
  { name: 'BOOKED', value: 2, label: '预定', color: 'warning' },
  { name: 'FAULT', value: 3, label: '故障', color: 'danger' },
  { name: 'DISABLED', value: 4, label: '停用', color: 'info' }
]

const roomList = [
  { name: '1', value: 1, label: '1001', color: 'warning' },
  { name: '2', value: 2, label: '1002', color: 'primary' },
  { name: '3', value: 3, label: '1003', color: 'success' },
  { name: '4', value: 4, label: '1004', color: 'info' },
  { name: '5', value: 5, label: '1005', color: 'danger' },
  { name: '6', value: 6, label: '1006', color: 'warning' },
  { name: '7', value: 7, label: '1007', color: 'primary' },
  { name: '9', value: 9, label: '1008', color: 'info' },
  { name: '8', value: 8, label: '1009', color: 'success' },
  { name: '10', value: 10, label: '1010', color: 'info' },
  { name: '11', value: 11, label: '1011', color: 'danger' }
]

const openStatus = [
  { value: '1', label: '打开', color: 'success' },
  { value: '2', label: '停止', color: 'info' },
  { value: '0', label: '关闭', color: 'danger' }
]

export default [
  {
    path: '/hotel/roomtype/options',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomTypes
      }
    }
  },
  {
    path: '/hotel/dicts/RoomStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomStatus
      }
    }
  },
  {
    path: '/hotel/room/options',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: roomList
      }
    }
  },
  {
    path: '/dicts/OpenStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: openStatus
      }
    }
  },
  {
    path: '/dicts/_OpenStatusEnum',
    method: 'get',
    handle ({ body }) {
      return {
        code: 0,
        msg: 'success',
        data: openStatus
      }
    }
  }

]
