import request from '@/plugin/axios'

export function GetRoomList (roomType) {
  return request({
    url: '/dashboard/rooms',
    method: 'get',
    params: {
      roomType: roomType
    }
  })
}
