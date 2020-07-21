const roomList = [
  {
    room: {
      id: 11,
      houseId: '7a7bc224854dabfd4c81ddb0eece4468',
      hotelId: 2,
      name: '  10 08        ',
      roomType: 1,
      status: 0,
      createDate: 1568863988000,
      updateDate: 1568863988000
    },
    status: 0
  }, {
    room: {
      id: 10,
      houseId: '65b1e6aa1ad9a92fbe54d45b13cfc3c2',
      hotelId: 2,
      name: '  1008  ',
      roomType: 1,
      status: 0,
      createDate: 1568863909000,
      updateDate: 1568863909000
    },
    status: 0
  }, {
    room: {
      id: 1,
      houseId: 'c9814652d46a7f946597e2d5ecc44910',
      hotelId: 2,
      name: '1001',
      roomType: 1,
      status: 0,
      createDate: 1568770596000,
      updateDate: 1568777612000
    },
    status: 1,
    checkIn: {
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
      guestName: '小明',
      mobile: '18611116467',
      telAreaCode: '86'
    }
  }, {
    room: {
      id: 2,
      houseId: '9f2359d7da664a84d7f0f60db54fe62a',
      hotelId: 2,
      name: '1002',
      roomType: 2,
      status: 0,
      createDate: 1568770602000,
      updateDate: 1568770602000
    },
    status: 1,
    checkIn: {
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
      mobile: '15235235235',
      telAreaCode: '86'
    }
  }, {
    room: {
      id: 3,
      houseId: '83523d9f6db289d07978a32ff90bb319',
      hotelId: 2,
      name: '1003',
      roomType: 3,
      status: 0,
      createDate: 1568770610000,
      updateDate: 1568770610000
    },
    status: 0
  }, {
    room: {
      id: 4,
      houseId: '51dc99f83fc0a0d7a11d87fa18a6d0a3',
      hotelId: 2,
      name: '1004',
      roomType: 4,
      status: 0,
      createDate: 1568770616000,
      updateDate: 1568770616000
    },
    status: 0
  }, {
    room: {
      id: 5,
      houseId: 'c9b4e38714c89522615560a1d2960d95',
      hotelId: 2,
      name: '1005',
      roomType: 2,
      status: 0,
      createDate: 1568770623000,
      updateDate: 1568770623000
    },
    status: 0
  }, {
    room: {
      id: 6,
      houseId: '828e5fcebff79d61c2a2b66a4426e9b7',
      hotelId: 2,
      name: '1006',
      roomType: 2,
      status: 0,
      createDate: 1568770629000,
      updateDate: 1568859039000
    },
    status: 0
  }, {
    room: {
      id: 7,
      houseId: '2e52879b36c0c74470b66d0c8d506ef7',
      hotelId: 2,
      name: '1007',
      roomType: 3,
      status: 0,
      createDate: 1568770637000,
      updateDate: 1568770637000
    },
    status: 0
  }, {
    room: {
      id: 9,
      houseId: '3dd242cf7bc245fcd514474815957473',
      hotelId: 2,
      name: '1008',
      roomType: 1,
      status: 0,
      createDate: 1568860441000,
      updateDate: 1568862727000
    },
    status: 0
  }, {
    room: {
      id: 8,
      houseId: '50d792ccf27bf8a35556baee5e2ad719',
      hotelId: 2,
      name: '1009',
      roomType: 1,
      status: 3,
      createDate: 1568860310000,
      updateDate: 1568860338000
    },
    status: 3
  }
]

export default [
  {
    path: '/dashboard/rooms',
    method: 'get',
    handle ({ body, query, params }) {
      return {
        code: 0,
        msg: 'success',
        data: roomList.filter((value) => {
          if (params.roomType == null) {
            return true
          }
          if (value.roomType === params.roomType) {
            return true
          }
          return false
        })
      }
    }
  }

]
