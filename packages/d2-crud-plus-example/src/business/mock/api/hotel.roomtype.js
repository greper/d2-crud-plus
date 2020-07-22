const roomtypePage = {
  records: [{
    id: 10,
    hotelId: 2,
    name: '套房',
    createDate: 1568860474000,
    updateDate: 1568862755000
  }, { id: 4, hotelId: 2, name: '豪华大床房', createDate: 1568770460000, updateDate: 1568770460000 }, {
    id: 3,
    hotelId: 2,
    name: '豪华双床房',
    createDate: 1568770219000,
    updateDate: 1568770219000
  }, { id: 2, hotelId: 2, name: '双床房', createDate: 1568770165000, updateDate: 1568770165000 }, {
    id: 1,
    hotelId: 2,
    name: '大床房',
    createDate: 1568768574000,
    updateDate: 1568768574000
  }],
  total: 5,
  size: 20,
  current: 1
}

export default [
  {
    path: '/hotel/roomtype/page',
    method: 'get',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: roomtypePage
      }
    }
  },
  {
    path: '/hotel/roomtype/add',
    method: 'post',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  },
  {
    path: '/hotel/roomtype/update',
    method: 'post',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  },
  {
    path: '/hotel/roomtype/delete',
    method: 'post',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  }
]
