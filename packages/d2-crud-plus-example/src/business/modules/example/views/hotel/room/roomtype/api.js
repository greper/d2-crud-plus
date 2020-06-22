import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/hotel/roomtype/page',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/hotel/roomtype/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/hotel/roomtype/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/hotel/roomtype/delete',
    method: 'post',
    params: { id }
  })
}
