import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/view/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/view/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/view/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/view/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCascadeData () {
  return request({
    url: '/view/cascadeData',
    method: 'get'
  })
}
