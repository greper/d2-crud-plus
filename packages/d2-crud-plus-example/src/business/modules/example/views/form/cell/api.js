import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/cell/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/cell/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/cell/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/cell/delete',
    method: 'post',
    params: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/cell/cascadeData',
    method: 'get'
  })
}
