const checkinPage = {
  records: [{
    id: 43,
    createDate: 1568879711000,
    updateDate: 1568879711000,
    checkInTime: 1567396800000,
    checkOutTime: 1567569600000,
    dayCount: 2,
    userId: 'bd41782a81033c2f424814044411e03e',
    hotelId: 2,
    houseId: '7a7bc224854dabfd4c81ddb0eece4468',
    roomId: 11,
    roomName: '1011',
    mobile: '15203030303',
    telAreaCode: '86',
    houseTempUserId: 43
  }, {
    id: 36,
    createDate: 1568863244000,
    updateDate: 1568863244000,
    checkInTime: 1568862000000,
    checkOutTime: 1568865600000,
    dayCount: 0,
    userId: 'd5f8420d95e4e719a403685b32330113',
    hotelId: 2,
    houseId: '51dc99f83fc0a0d7a11d87fa18a6d0a3',
    roomId: 4,
    roomName: '1004',
    guestName: '丽丽',
    mobile: '15236525236',
    telAreaCode: '86',
    houseTempUserId: 36
  }, {
    id: 26,
    createDate: 1568861279000,
    updateDate: 1568862884000,
    checkInTime: 1568862880000,
    checkOutTime: 1569038400000,
    dayCount: 2,
    userId: '8776179cb7bc7d63cf1d75c8dc90e1bb',
    hotelId: 2,
    houseId: '9f2359d7da664a84d7f0f60db54fe62a',
    roomId: 2,
    roomName: '1002',
    guestName: '',
    mobile: '15235235235',
    telAreaCode: '86',
    houseTempUserId: 26,
    remark: ''
  }, {
    id: 25,
    createDate: 1568861267000,
    updateDate: 1568861267000,
    checkInTime: 1568861263000,
    checkOutTime: 1568952000000,
    dayCount: 1,
    userId: '8776179cb7bc7d63cf1d75c8dc90e1bb',
    hotelId: 2,
    houseId: '9f2359d7da664a84d7f0f60db54fe62a',
    roomId: 2,
    roomName: '1002',
    mobile: '15235235235',
    telAreaCode: '86',
    houseTempUserId: 25
  }, {
    id: 22,
    createDate: 1568861234000,
    updateDate: 1568861234000,
    checkInTime: 1568861229000,
    checkOutTime: 1568952001000,
    dayCount: 1,
    userId: '8776179cb7bc7d63cf1d75c8dc90e1bb',
    hotelId: 2,
    houseId: '9f2359d7da664a84d7f0f60db54fe62a',
    roomId: 2,
    roomName: '1002',
    mobile: '15235235235',
    telAreaCode: '86',
    houseTempUserId: 22
  }, {
    id: 21,
    createDate: 1568861224000,
    updateDate: 1568861224000,
    checkInTime: 1568861220000,
    checkOutTime: 1569038400000,
    dayCount: 2,
    userId: '8776179cb7bc7d63cf1d75c8dc90e1bb',
    hotelId: 2,
    houseId: 'c9814652d46a7f946597e2d5ecc44910',
    roomId: 1,
    roomName: '1001',
    mobile: '15235235235',
    telAreaCode: '86',
    houseTempUserId: 21
  }, {
    id: 20,
    createDate: 1568861217000,
    updateDate: 1568861217000,
    checkInTime: 1568861213000,
    checkOutTime: 1568952000000,
    dayCount: 1,
    userId: '283f1b269cc6f141abe16b76661290f7',
    hotelId: 2,
    houseId: 'c9814652d46a7f946597e2d5ecc44910',
    roomId: 1,
    roomName: '1001',
    mobile: '15235235235',
    telAreaCode: '852',
    houseTempUserId: 20
  }, {
    id: 12,
    createDate: 1568799708000,
    updateDate: 1568799708000,
    checkInTime: 1568886079000,
    checkOutTime: 1569058879000,
    dayCount: 2,
    userId: 'd5c81ff2d2ba8abe73d74f2fe3ec0d1b',
    hotelId: 2,
    houseId: 'c9814652d46a7f946597e2d5ecc44910',
    roomId: 1,
    roomName: '1001',
    guestName: '雯子',
    mobile: '15236253652',
    telAreaCode: '86',
    houseTempUserId: 12
  }, {
    id: 10,
    createDate: 1568799266000,
    updateDate: 1568799266000,
    checkInTime: 1568799252000,
    checkOutTime: 1568865600000,
    dayCount: 0,
    userId: 'd32a97b5eeab940700d588fd5fd5f624',
    hotelId: 2,
    houseId: 'c9814652d46a7f946597e2d5ecc44910',
    roomId: 1,
    roomName: '1001',
    guestName: '等待额',
    mobile: '15236325365',
    telAreaCode: '86',
    houseTempUserId: 10
  }, {
    id: 1,
    createDate: 1568771262000,
    updateDate: 1568771262000,
    checkInTime: 1568771251000,
    checkOutTime: 1568952001000,
    dayCount: 2,
    userId: 'c1db8c96dadf83e22f8e75b8dc3a7524',
    hotelId: 2,
    houseId: 'c9814652d46a7f946597e2d5ecc44910',
    roomId: 1,
    roomName: '1001',
    guestName: '小明',
    mobile: '18611116467',
    telAreaCode: '86',
    houseTempUserId: 1
  }],
  total: 10,
  size: 20,
  current: 1
}

export default [
  {
    path: '/hotel/checkin/page',
    method: 'get',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: checkinPage
      }
    }
  },
  {
    path: '/hotel/checkin/add',
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
    path: '/hotel/checkin/update',
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
    path: '/hotel/checkin/delete',
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
    path: '/hotel/checkin/checkout',
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
