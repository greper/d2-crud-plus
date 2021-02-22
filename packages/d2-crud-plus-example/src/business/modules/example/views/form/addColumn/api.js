import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/addColumn/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/addColumn/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/addColumn/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/addColumn/delete',
    method: 'post',
    data: { id }
  })
}
