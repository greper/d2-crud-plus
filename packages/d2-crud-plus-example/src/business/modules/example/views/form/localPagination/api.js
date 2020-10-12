import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/localPagination/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/localPagination/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/localPagination/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/localPagination/delete',
    method: 'post',
    data: { id }
  })
}
