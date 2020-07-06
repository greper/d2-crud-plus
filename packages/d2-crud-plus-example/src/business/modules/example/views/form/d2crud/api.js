import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/d2crud/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/d2crud/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/d2crud/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/d2crud/delete',
    method: 'post',
    data: { id }
  })
}
