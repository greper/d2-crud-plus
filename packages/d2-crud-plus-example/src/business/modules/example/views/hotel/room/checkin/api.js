import request from '@/plugin/axios'

export function GetList (query) {
  return request({
    url: '/hotel/checkin/page',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/hotel/checkin/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/hotel/checkin/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/hotel/checkin/delete',
    method: 'post',
    params: { id }
  })
}
export function DoCheckOut (id) {
  return request({
    url: '/hotel/checkin/checkout',
    method: 'post',
    params: { id }
  })
}
