import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/tree/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/tree/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/tree/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/tree/delete',
    method: 'post',
    data: { id }
  })
}
