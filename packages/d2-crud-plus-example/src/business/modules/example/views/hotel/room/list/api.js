import request from '@/business/api/request.mock'

export function GetRoomList (query) {
  return request({
    url: '/hotel/room/page',
    method: 'get',
    params: query
  })
}

export function AddRoom (room) {
  return request({
    url: '/hotel/room/add',
    method: 'post',
    data: room
  })
}

export function UpdateRoom (room) {
  return request({
    url: '/hotel/room/update',
    method: 'post',
    data: room
  })
}
export function DelRoom (id) {
  return request({
    url: '/hotel/room/delete',
    method: 'post',
    params: { id }
  })
}
