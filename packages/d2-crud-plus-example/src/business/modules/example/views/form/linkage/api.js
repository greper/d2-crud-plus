import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/linkage/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/linkage/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/linkage/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/linkage/delete',
    method: 'post',
    data: { id }
  })
}
