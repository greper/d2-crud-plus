import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/noPagination/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/noPagination/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/noPagination/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/noPagination/delete',
    method: 'post',
    data: { id }
  })
}
