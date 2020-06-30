import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/disabled/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/disabled/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/disabled/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/disabled/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/disabled/cascadeData',
    method: 'get'
  })
}
