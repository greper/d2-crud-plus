import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/addi/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/addi/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/addi/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/addi/delete',
    method: 'post',
    data: { id }
  })
}
