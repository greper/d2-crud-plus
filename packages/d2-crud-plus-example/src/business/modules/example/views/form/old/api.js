import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/old/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/old/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/old/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/old/delete',
    method: 'post',
    data: { id }
  })
}
