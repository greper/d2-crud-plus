import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/fromBackend/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/fromBackend/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/fromBackend/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/fromBackend/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCrud () {
  return request({
    url: '/fromBackend/crud',
    method: 'get'
  })
}
