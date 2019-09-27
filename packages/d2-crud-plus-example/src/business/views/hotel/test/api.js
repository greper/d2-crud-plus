import request from '@/plugin/axios'

export function GetRoomList (query) {
  return request({
    url: '/hotel/room/list',
    method: 'get',
    params: query
  })
}
