import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/deepData/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/deepData/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/deepData/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/deepData/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/deepData/cascadeData',
    method: 'get'
  })
}
