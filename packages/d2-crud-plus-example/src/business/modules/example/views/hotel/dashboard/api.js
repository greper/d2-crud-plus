import request from '@/business/api/request.mock'

export function GetRoomList (roomType) {
  return request({
    url: '/dashboard/rooms',
    method: 'get',
    params: {
      roomType: roomType
    }
  })
}
