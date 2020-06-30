import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/validation/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/validation/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/validation/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/validation/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/validation/cascadeData',
    method: 'get'
  })
}
