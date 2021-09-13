import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/show/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/show/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/show/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/show/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/show/cascadeData',
    method: 'get'
  })
}
